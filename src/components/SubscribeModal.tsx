'use client'

import { Modal } from '../components/ui/Modal'
import { SubscriptionPlans } from './SubscriptionPlans'

export interface BillingPortalButtonProps {
  backgroundColor?: string
  textColor?: string
  redirect?: string // optional redirect URL on cancel
  customerId?: string //provide an override id for the customer to be managed
}

export interface SubscribeModalProps {
  apiBaseUrl: string
  clientEmail?: string //provide an override email for the entity to be subscribed
  clientId?: string //provide an override id for the entity to be subscribed
  open: boolean
  primaryColor?: string
  quantity: number
  redirect?: string //provide a redirect URL after subscription
  title: string
  handleClose: () => void
}

export const SubscribeModal = ({
  apiBaseUrl,
  clientEmail,
  clientId,
  open,
  primaryColor,
  quantity,
  redirect,
  title = 'Subscribe',
  handleClose,
}: SubscribeModalProps) => {
  return (
    <Modal open={open} handleClose={handleClose} title={title}>
      <SubscriptionPlans
        apiBaseUrl={apiBaseUrl}
        clientEmail={clientEmail}
        clientId={clientId}
        primaryColor={primaryColor}
        quantity={quantity}
        redirect={redirect}
      />
    </Modal>
  )
}
