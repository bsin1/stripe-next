import {
  DEFAULT_API_PATH,
  StripeNextOptions,
  StripeRouteHandlers,
} from './types'
import {
  BillingPortalButtonProps,
  SubscribeModal,
  SubscribeModalProps,
} from './components/SubscribeModal'
import { BillingPortalButton } from './components/BillingPortalButton'
import React from 'react'
import { createStripeHandlers } from './utils'
import StripeNamespace from 'stripe'

export { StripeNamespace as Stripe }

interface StripeNext {
  handlers: StripeRouteHandlers
  BillingPortalButton: (props: BillingPortalButtonProps) => React.ReactNode
  SubscribeModal: (
    props: Omit<SubscribeModalProps, 'apiBaseUrl'>,
  ) => React.ReactNode
}

export const StripeNext = (options: StripeNextOptions): StripeNext => ({
  handlers: createStripeHandlers(options),
  BillingPortalButton: ({ backgroundColor, customerId, textColor }) => {
    return (
      <BillingPortalButton
        apiBaseUrl={options.apiBaseUrl ?? DEFAULT_API_PATH}
        customerId={customerId}
        primaryColor={backgroundColor ?? options.primaryColor}
        textColor={textColor}
      />
    )
  },
  SubscribeModal: ({
    handleClose,
    clientEmail,
    clientId,
    open,
    quantity,
    redirect,
    title,
  }) => (
    <SubscribeModal
      apiBaseUrl={options.apiBaseUrl ?? DEFAULT_API_PATH}
      clientEmail={clientEmail}
      clientId={clientId}
      handleClose={handleClose}
      open={open}
      primaryColor={options.primaryColor}
      quantity={quantity}
      redirect={redirect}
      title={title}
    />
  ),
})
