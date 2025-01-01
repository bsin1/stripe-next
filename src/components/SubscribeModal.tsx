'use client'

import { Modal } from '../components/ui/Modal'
import { SubscriptionPlans } from './SubscriptionPlans'

export interface SubscribeModalProps {
  apiBaseUrl: string
  open: boolean
  title: string
  getCurrentUser: () => Promise<{ email: string; id: string }>
  handleClose: () => void
}

export const SubscribeModal = ({
  apiBaseUrl,
  open,
  title = 'Subscribe',
  getCurrentUser,
  handleClose,
}: SubscribeModalProps) => {
  return (
    <Modal open={open} handleClose={handleClose} title={title}>
      <SubscriptionPlans
        apiBaseUrl={apiBaseUrl}
        getCurrentUser={getCurrentUser}
      />
    </Modal>
  )
}
