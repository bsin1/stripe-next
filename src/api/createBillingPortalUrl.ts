'use server'

import { NextRequest } from 'next/server'
import { stripe } from '../stripe'

export const createBillingPortalUrl = async (
  req: NextRequest,
  retrieveCustomerId: () => Promise<string>,
): Promise<Response> => {
  const returnUrl = req.nextUrl.searchParams.get('return_url') ?? '/app'

  console.log('BILLING PORTAL RETURN URL: ', returnUrl)

  const customerId = await retrieveCustomerId()

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })

  return Response.json({ data: portalSession.url })
}
