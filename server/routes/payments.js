/* ──────────────────────────  routes/payments.js  ───────────────────────── */
import 'dotenv/config';
import express from 'express';
import Stripe from 'stripe';
import paypal from '@paypal/checkout-server-sdk';
import { createRequire } from 'node:module';
import fs from 'fs';
import db from '../db.js'; // connexion MySQL

const require = createRequire(import.meta.url);
const AmazonPay = require('@amazonpay/amazon-pay-api-sdk-nodejs');

const router = express.Router();

/* ---------- 1. STRIPE (Apple Pay & Google Pay) -------------------------- */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
});

/* ---------- 2. PAYPAL (Orders v2) -------------------------------------- */
const isLive = process.env.PAYPAL_MODE === 'live';

const paypalEnv = isLive
  ? new paypal.core.LiveEnvironment(
      process.env.PAYPAL_CLIENT_ID_LIVE,
      process.env.PAYPAL_CLIENT_SECRET_LIVE
    )
  : new paypal.core.SandboxEnvironment(
      process.env.PAYPAL_CLIENT_ID_SANDBOX,
      process.env.PAYPAL_CLIENT_SECRET_SANDBOX
    );

const paypalClient = new paypal.core.PayPalHttpClient(paypalEnv);

/* ---------- 3. AMAZON PAY (SDK v2) ------------------------------------- */
/*const amazonClient = AmazonPay.createCheckoutSessionClient({
  publicKeyId: process.env.AMAZON_PAY_PUBLIC_KEY_ID,
  privateKey: fs.readFileSync('./keys/private.pem', 'utf8'),
  region: process.env.AMAZON_PAY_REGION || 'EU',
  sandbox: process.env.AMAZON_PAY_ENV !== 'LIVE',
});*/

/* ---------- 4. /api/payments/create ------------------------------------ */
router.post('/create', async (req, res) => {
  const { amount, currency, platform, professional_id } = req.body;

  if (!amount || !currency || !platform || !professional_id) {
    return res.status(400).json({ error: 'amount, currency, platform et professional_id requis' });
  }

  try {
    // Définir dates d’abonnement (1 mois)
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    switch (platform) {
      /* Stripe : Apple Pay / Google Pay */
      case 'Cash':
      case 'Google Pay': {
        const intent = await stripe.paymentIntents.create({
          amount: Number(amount),
          currency: currency.toLowerCase(),
          automatic_payment_methods: { enabled: true },
        });

        // Insérer en base
        await db.execute(
          `INSERT INTO premium_subscriptions 
           (professional_id, start_date, end_date, subscriptions_name, status, value)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [professional_id, startDate, endDate, 'Stripe', 'active', (amount / 100).toFixed(2)]
        );

        return res.json({ clientSecret: intent.client_secret });
      }

      /* PayPal */
      case 'PayPal': {
        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer('return=representation');
        request.requestBody({
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                value: (amount / 100).toFixed(2),
                currency_code: currency.toUpperCase(),
              },
            },
          ],
        });

        const order = await paypalClient.execute(request);
        const approvalUrl = order.result.links.find((l) => l.rel === 'approve')?.href;

        // Insérer en base
        await db.execute(
          `INSERT INTO premium_subscriptions 
           (professional_id, start_date, end_date, subscriptions_name, status, value)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [professional_id, startDate, endDate, 'PayPal', 'active', (amount / 100).toFixed(2)]
        );

        return res.json({ orderId: order.result.id, approvalUrl });
      }

      /* Amazon Pay */
      case 'Amazon Pay': {
        const session = await amazonClient.createCheckoutSession({
          webCheckoutDetails: {
            checkoutReviewReturnUrl: `${process.env.FRONT_URL}/payment-success`,
          },
          storeId: process.env.AMAZON_PAY_STORE_ID,
          paymentDetails: {
            chargeAmount: {
              amount: (amount / 100).toFixed(2),
              currencyCode: currency.toUpperCase(),
            },
          },
        });

        // Insérer en base
        await db.execute(
          `INSERT INTO premium_subscriptions 
           (professional_id, start_date, end_date, subscriptions_name, status, value)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [professional_id, startDate, endDate, 'Amazon Pay', 'active', (amount / 100).toFixed(2)]
        );

        return res.json({
          sessionId: session.checkoutSessionId,
          amazonPayUrl: session.webCheckoutDetails.amazonPayRedirectUrl,
        });
      }

      default:
        return res.status(400).json({ error: 'Moyen de paiement non supporté' });
    }
  } catch (err) {
    console.error('create error →', err);
    res.status(err.statusCode || 500).json({ error: err.message || 'Erreur serveur' });
  }
});

/* ---------- 5. /api/payments/capture (PayPal) -------------------------- */
router.post('/capture', async (req, res) => {
  const { orderId } = req.body;
  if (!orderId) return res.status(400).json({ error: 'orderId requis' });

  try {
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});
    const capture = await paypalClient.execute(request);

    return res.json({ status: capture.result.status, details: capture.result });
  } catch (err) {
    console.error('capture error →', err);
    res.status(err.statusCode || 500).json({ error: err.message || 'Erreur serveur' });
  }
});

export default router;
