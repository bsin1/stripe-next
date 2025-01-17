'use client'

import { Modal } from '../components/ui/Modal'
import { SubscriptionPlans } from './SubscriptionPlans'

export interface BillingPortalButtonProps {
  backgroundColor?: string
}

export interface SubscribeModalProps {
  apiBaseUrl: string
  open: boolean
  primaryColor?: string
  title: string
  handleClose: () => void
}

export const SubscribeModal = ({
  apiBaseUrl,
  open,
  primaryColor,
  title = 'Subscribe',
  handleClose,
}: SubscribeModalProps) => {
  return (
    <Modal open={open} handleClose={handleClose} title={title}>
      <SubscriptionPlans apiBaseUrl={apiBaseUrl} primaryColor={primaryColor} />
    </Modal>
  )
}
