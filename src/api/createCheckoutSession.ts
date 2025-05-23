'use server'

import { NextRequest } from 'next/server'
import { stripe } from '../stripe'

export const createCheckoutSession = async (
  req: NextRequest,
  apiBaseUrl: string,
  getUser?: () => Promise<{ email: string; id: string }>,
): Promise<Response> => {
  const {
    cancelRedirectUrl,
    priceId,
    successRedirectUrl,
    clientId,
    clientEmail,
    quantity,
  } = await req.json()

  // Use req.nextUrl.protocol for reliable protocol detection
  const protocol = req.nextUrl.protocol // Should return 'http:' or 'https:'
  const host = req.headers.get('host') // The host (e.g., example.com or localhost:3000)

  const checkoutRedirectUrl = `${protocol}//${host}${apiBaseUrl}/checkout/redirect`

  const userData = await getUser?.()

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: quantity,
      },
    ],
    success_url: `${checkoutRedirectUrl}?session_id={CHECKOUT_SESSION_ID}&success_redirect=${successRedirectUrl}`,
    cancel_url: cancelRedirectUrl,
    client_reference_id: clientId ?? userData?.id,
    customer_email: clientEmail ?? userData?.email,
  })

  return Response.json({ data: checkoutSession.id })
}
