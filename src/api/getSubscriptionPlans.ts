'use server'

import Stripe from 'stripe'
import { stripe } from '../stripe'

export const getSubscriptionPlans = async (
  productFilter?: string,
): Promise<Response> => {
  const prices = await stripe.prices.list({
    expand: ['data.product'],
    active: true,
    type: 'recurring',
  })

  let data = prices.data

  if (productFilter) {
    data = prices.data.filter((price) =>
      (price.product as Stripe.Product).name
        .toLowerCase()
        .includes(productFilter.toLowerCase()),
    )
  }

  return Response.json({
    data: data.map((price) => ({
      id: price.id,
      name: (price.product as Stripe.Product).name,
      description: (price.product as Stripe.Product).description,
      price: price.unit_amount,
      interval: price.recurring?.interval,
      price_id: price.id,
    })),
  })
}
