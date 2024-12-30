'use server'

import { NextRequest } from 'next/server'
import { stripe } from '../stripe'

export const createCheckoutSession = async (
  req: NextRequest,
  getUser: () => Promise<{ email: string; id: string }>,
): Promise<Response> => {
  const { cancelRedirectUrl, priceId, successRedirectUrl } = await req.json()
  console.log('CREATE CHECKOUT SESSION: ', cancelRedirectUrl)

  const { email, id } = await getUser()

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${successRedirectUrl}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: cancelRedirectUrl,
    client_reference_id: id,
    customer_email: email,
  })

  return Response.json({ data: checkoutSession.id })
}
