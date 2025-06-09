/* ──────────────────────────  routes/payments.js  ───────────────────────── */
import express from 'express';
import Stripe from 'stripe';
import paypal from '@paypal/checkout-server-sdk';
import { AmazonPayClient } from '@amazonpay/amazon-pay-api-sdk-nodejs';
import fs from 'fs';                // si vous chargez la clé privée depuis un fichier

const router = express.Router();

/* ---------- 1. STRIPE : Apple Pay & Google Pay -------------------------- */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',         // précise une version stable
});

/* ---------------- 2. PAYPAL : Orders v2 -------------------------------- */
const paypalEnv =
  process.env.PAYPAL_MODE === 'live'
    ? new paypal.core.LiveEnvironment(
        process.env.PAYPAL_CLIENT_ID,
        process.env.PAYPAL_CLIENT_SECRET
      )
    : new paypal.core.SandboxEnvironment(
        process.env.PAYPAL_CLIENT_ID,
        process.env.PAYPAL_CLIENT_SECRET
      );
const paypalClient = new paypal.core.PayPalHttpClient(paypalEnv);

/* ---------------- 3. AMAZON PAY : SDK v2 ------------------------------- */
const amazonClient = new AmazonPayClient({
  publicKeyId : process.env.AMAZON_PAY_PUBLIC_KEY_ID,
  privateKey  : process.env.AMAZON_PAY_PRIVATE_KEY,                         // si var d’env contient \n
  region      : process.env.AMAZON_PAY_REGION || 'EU',             // 'EU', 'US', 'JP'
  environment : process.env.AMAZON_PAY_ENV  || 'SANDBOX',          // 'LIVE' ou 'SANDBOX'
  merchantId  : process.env.AMAZON_PAY_MERCHANT_ID,
  storeId     : process.env.AMAZON_PAY_STORE_ID,
});

/* ---------------- 4. ROUTE /api/payments/create ------------------------ */
router.post('/create', async (req, res) => {
  const { amount, currency, platform } = req.body;

  if (!amount || !currency || !platform) {
    return res.status(400).json({ error: 'amount, currency et platform requis' });
  }

  try {
    switch (platform) {
     // Apple Pay & Google Pay (Stripe)
case 'Apple Pay':
case 'Google Pay': {
  const intent = await stripe.paymentIntents.create({
    amount: Number(amount),          // en cents
    currency: currency.toLowerCase(),
    automatic_payment_methods: { enabled: true }, // ⚠️ changez ceci
  });
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
        const approvalUrl =
          order.result.links.find((l) => l.rel === 'approve')?.href;
        return res.json({ approvalUrl, orderId: order.result.id });
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
        return res.json({
          amazonPayUrl: session.webCheckoutDetails.amazonPayRedirectUrl,
          sessionId: session.checkoutSessionId,
        });
      }

      default:
        return res.status(400).json({ error: 'Moyen de paiement non supporté' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err?.message || 'Erreur serveur' });
  }
});

export default router;
