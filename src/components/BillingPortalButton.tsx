'use client'

import { useState } from 'react'

interface Props {
  apiBaseUrl: string
  customerId?: string
  primaryColor?: string
  textColor?: string
  redirect?: string
}

export const BillingPortalButton = ({
  apiBaseUrl,
  customerId,
  primaryColor,
  redirect,
  textColor,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleRedirect = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const returnUrl = encodeURIComponent(redirect ?? window.location.href)
      const customerParam = customerId
        ? `&customer_id=${encodeURIComponent(customerId)}`
        : ''
      const response = await fetch(
        `${apiBaseUrl}/subscription/manage?return_url=${returnUrl}${customerParam}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (!response.ok) {
        throw new Error('Failed to generate billing portal URL.')
      }

      const { data } = await response.json()

      if (data && typeof data === 'string') {
        window.location.href = data
      } else {
        throw new Error('Invalid response from server.')
      }
    } catch (err) {
      console.error(err)
      setError('Unable to redirect. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onClick={handleRedirect}
        className={`rounded-lg px-4 py-2 text-white ${
          isLoading ? 'cursor-not-allowed bg-gray-500' : 'bg-black'
        }`}
        style={{
          backgroundColor: isLoading ? '#A0A0A0' : primaryColor,
          color: textColor,
        }}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Manage Subscription'}
      </button>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  )
}
