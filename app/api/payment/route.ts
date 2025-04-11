import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16'
})

export async function POST(req: Request) {
  try {
    const { amount, currency, payment_method_types = ['card'] } = await req.json()
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types,
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}