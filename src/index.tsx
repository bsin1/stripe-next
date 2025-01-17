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
    props: Omit<SubscribeModalProps, 'getCurrentUser' | 'apiBaseUrl'>,
  ) => React.ReactNode
}

export const StripeNext = (options: StripeNextOptions): StripeNext => ({
  handlers: createStripeHandlers(options),
  BillingPortalButton: ({ backgroundColor }) => {
    return (
      <BillingPortalButton
        apiBaseUrl={options.apiBaseUrl ?? DEFAULT_API_PATH}
        primaryColor={backgroundColor ?? options.primaryColor}
      />
    )
  },
  SubscribeModal: ({ handleClose, open, title }) => (
    <SubscribeModal
      apiBaseUrl={options.apiBaseUrl ?? DEFAULT_API_PATH}
      handleClose={handleClose}
      open={open}
      primaryColor={options.primaryColor}
      title={title}
    />
  ),
})
