# Stripe-Next

## About

`stripe-next` is a lightweight library designed to simplify the integration of Stripe into your Next.js application. \
\
This package is currently intended to facilitate recurring subscriptions and provides essential components and utilities to streamline subscription management, billing portal access, and Stripe API interactions, making it a perfect companion for modern Next.js projects.

This library has been tested with Next.js version 14.2.

## Installation

To install the package, use the following command:

```bash
npm install stripe-next
```

## Usage

### 1. Import and Initialize the Library

First, import and configure the `stripe-next` library:

```ts
// /stripe-config.ts

import { StripeNext } from "stripe-next";

const { handlers, BillingPortalButton, SubscribeModal } = StripeNext({
  apiBaseUrl: "/api/custom/path", // optional - default is /api/stripe
  getCurrentCustomerId: async (): Promise<string> => {
    // required - return the current customer id
    return "cus_abc";
  },
  getCurrentUser: async (): Promise<{ id: string; email: string }> => {
    // required - return the current user details
    return { id: "user_123", email: "test@test.com" };
  },
  onSubscriptionCreated: async (
    subscription: Stripe.Subscription,
    clientRequestId: string,
  ): Promise<void> => {
    // required - add the subscription record to your database
  },
  onSubscriptionDeleted: async (
    subscription: Stripe.Subscription,
  ): Promise<void> => {
    // required - update the subscription record in your database
  },
  onSubscriptionUpdated: async (
    subscription: Stripe.Subscription,
  ): Promise<void> => {
    // required - update the subscription record in your database
  },
});
```

### 2. Use the Provided Components

#### Billing Portal Button

Use the `BillingPortalButton` returned by StripeNext to access the Stripe billing portal:

```tsx
import React from "react";
import { BillingPortalButton } from "stripe-config";

export default function BillingPortalPage() {
  return <BillingPortalButton />;
}
```

#### Subscription Modal

Display a subscription modal to manage user subscriptions:

```tsx
import React from "react";
import { SubscribeModal } from "stripe-config";

export default function SubscribePage() {
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);

  return (
    <SubscribeModal
      open={showSubscribeModal} // Set to true to display the modal
      handleClose={() => setShowSubscribeModal(false)}
      title="Subscribe"
    />
  );
}
```

### 3. Use Handlers in API Routes

Integrate Stripe route handlers to manage server-side functionality:

```ts
// app/api/stripe/[...actions]/route.ts

import { handlers } from "stripe-config";

export const { GET, POST } = handlers;
```

##

## Requirements

- **Next.js**: Version 14.2 
