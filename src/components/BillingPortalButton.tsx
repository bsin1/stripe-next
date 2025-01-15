'use client'

import { useEffect, useState } from 'react'

interface Props {
  apiBaseUrl: string
  primaryColor?: string
}

export const BillingPortalButton = ({ apiBaseUrl, primaryColor }: Props) => {
  const [url, setUrl] = useState<string>()

  useEffect(() => {
    const getPortalUrl = async () => {
      const response = await fetch(
        `${apiBaseUrl}/subscription/manage?return_url=${window.location.href}`,
      )

      const { data } = await response.json()

      setUrl(data)
    }
    getPortalUrl()
  }, [])

  return (
    <div className="flex h-full w-full items-center justify-center">
      {url ? (
        <a href={url}>
          <button
            className="rounded-lg bg-black p-4 text-white"
            style={primaryColor ? { backgroundColor: primaryColor } : undefined}
          >
            Manage Subscription
          </button>
        </a>
      ) : (
        <div className="spinner border-black border-b-transparent"></div>
      )}
    </div>
  )
}
