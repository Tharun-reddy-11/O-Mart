import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Casting apiVersion to any to bypass type conflicts if necessary
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-08-16' as any,
});

export async function POST(req: Request) {
  try {
    const { amount, currency, payment_method_types = ['card'] } = await req.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
