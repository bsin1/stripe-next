# Stripe-Next

## About

`stripe-next` is designed to simplify the integration of Stripe into your Next.js application. \
\
This package is currently intended to facilitate recurring subscriptions and provides essential components and utilities to streamline subscription management, billing portal access, and Stripe API interactions.

This library has been tested with Next.js version 14.2

## Installation

```bash
npm install stripe-next
```

## Usage

### 1. Add Required env variables

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""

```

### 2. Import and Initialize the Library

```ts
// /stripe-config.ts

import { StripeNext } from "stripe-next";

const { handlers, BillingPortalButton, SubscribeModal } = StripeNext({
  apiBaseUrl: "/api/custom/path", // optional - default is /api/stripe
  productFilter: "pro", // optional - filter products returned by the subscribe modal
  subscriptionSuccessRedirectPath: "/app/redirect", // required - redirect after successful subscription
  getCurrentCustomerId: async (): Promise<string> => {
    // required - return the current customer id
    return "cus_abc";
  },
  getCurrentUser: async (): Promise<{ id: string; email: string }> => {
    // required - return the current user details
    return { id: "user_123", email: "test@test.com" };
  },
  onSubscriptionCreated: async (
    userId: string,
    subscription: Stripe.Subscription,
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

### 3. Use the Provided Components

#### Billing Portal Button

Use the `BillingPortalButton` returned by StripeNext to access the Stripe billing portal:

```tsx
import { BillingPortalButton } from "stripe-config";

export default function BillingPortalPage() {
  return <BillingPortalButton />;
}
```

#### Subscription Modal

Display a subscription modal to manage user subscriptions:

```tsx
import { useState } from "react";
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

### 4. Use Handlers in API Routes

Integrate Stripe route handlers to manage server-side functionality:

```ts
// app/api/stripe/[...actions]/route.ts

import { handlers } from "stripe-config";

export const { GET, POST } = handlers;
```
