'use server'

import { NextRequest } from 'next/server'
import { stripe } from '../stripe'
import Stripe from 'stripe'

export const checkoutRedirect = async (
  req: NextRequest,
  subscriptionSuccessRedirectPath: string,
  onSubscriptionSucccess: (
    userId: string,
    subscription: Stripe.Subscription,
  ) => Promise<any>,
): Promise<Response> => {
  const sessionId = req.nextUrl.searchParams.get('session_id')

  if (!sessionId) {
    return Response.error()
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription'],
    })

    let subscription: any = undefined
    if (session.payment_status === 'paid') {
      if (session.client_reference_id && session.subscription) {
        subscription = await onSubscriptionSucccess(
          session.client_reference_id,
          session.subscription as Stripe.Subscription,
        )
      }
    }
    const url = new URL(subscriptionSuccessRedirectPath, req.url)

    return Response.redirect(url)
  } catch (error) {
    console.log('CHECKOUT REDIRECT ERROR: ', error)
    return Response.error()
  }
}
