// backend/routes/payments.js
/*import express from 'express'
import Stripe from 'stripe'

const router = express.Router()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

/**
 * POST /api/create-payment-intent
 * Body: { amount: number (en cents), currency: string }
 */
/*router.post('/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,               // ex. 50000 pour 500,00€
      currency,             // 'eur'
      payment_method_types: ['card', 'google_pay', 'apple_pay']
    })
    res.json({ clientSecret: paymentIntent.client_secret })
  } catch (err) {
    console.error('Stripe error:', err)
    res.status(400).json({ error: err.message })
  }
})

export default router*/
