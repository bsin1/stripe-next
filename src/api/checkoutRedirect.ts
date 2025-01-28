'use server'

import { NextRequest } from 'next/server'
import { stripe } from '../stripe'
import Stripe from 'stripe'

export const checkoutRedirect = async (
  req: NextRequest,
  onSubscriptionSucccess: (
    clientId: string,
    subscription: Stripe.Subscription,
  ) => Promise<any>,
): Promise<Response> => {
  const sessionId = req.nextUrl.searchParams.get('session_id')
  const successRedirectUrl = req.nextUrl.searchParams.get('success_redirect')

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
    // const url = new URL(successRedirectUrl, req.url)

    return Response.redirect(successRedirectUrl ?? req.nextUrl.origin)
  } catch (error) {
    console.log('CHECKOUT REDIRECT ERROR: ', error)
    return Response.error()
  }
}
