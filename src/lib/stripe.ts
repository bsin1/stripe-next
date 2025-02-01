import { stripe } from '../stripe'

export const updateSubscriptionQuantity = async (
  subId: string,
  subItemId: string,
  quantity: number,
) => {
  return stripe.subscriptions.update(subId, {
    items: [{ id: subItemId, quantity }],
  })
}
