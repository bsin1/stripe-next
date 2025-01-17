'use client'

import { useEffect, useState } from 'react'

interface Props {
  apiBaseUrl: string
  primaryColor?: string
  textColor?: string
}

export const BillingPortalButton = ({
  apiBaseUrl,
  primaryColor,
  textColor,
}: Props) => {
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
    <div className="flex items-center justify-center">
      {url ? (
        <a href={url}>
          <button
            className="rounded-lg bg-black px-4 py-2 text-white"
            style={{ backgroundColor: primaryColor, color: textColor }}
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
