import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '../stripe'

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export const handleWebhooks = async (
  request: NextRequest,
  handleSubscriptionUpdated: (
    subscription: Stripe.Subscription,
  ) => Promise<void>,
  handleSubscriptionDeleted: (
    subscription: Stripe.Subscription,
  ) => Promise<void>,
) => {
  const body = await request.text()

  const sig = request.headers.get('stripe-signature')
  let event

  try {
    if (!sig) {
      throw new Error('No stripe-signature provided')
    }
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    console.error('Error verifying webhook signature:', err)
    return NextResponse.json(
      { error: `Webhook Error: ${err}` },
      { status: 400 },
    )
  }

  // Handle the event
  switch (event.type) {
    case 'customer.subscription.updated':
      await handleSubscriptionUpdated(event.data.object)
      break
    case 'customer.subscription.deleted':
      await handleSubscriptionDeleted(event.data.object)
      break
    // case 'invoice.payment_succeeded':
    //   await handleInvoicePaid(event.data.object)
    //   break
    // ... handle other events
    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
