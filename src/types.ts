import { NextRequest } from "next/server";
import Stripe from "stripe";

export const DEFAULT_API_PATH = "/api/stripe";

export type StripeRouteHandlers = Record<
  "GET" | "POST",
  (req: NextRequest) => Promise<Response>
>;

export interface StripeRequest {
  section: string;
  action: string;
}

interface SectionActionMap {
  [key: string]: string[];
}

export const SECTION_ACTION_MAP: SectionActionMap = {
  checkout: ["create", "redirect"],
  subscription: ["manage", "plans"],
  webhooks: [],
};

export type StripeNextOptions = {
  apiBaseUrl?: string;
  productFilter?: string;
  getCurrentUser: () => Promise<{ id: string; email: string }>;
  getCurrentCustomerId: () => Promise<string>;
  onSubscriptionCreated: (
    clientReferenceId: string,
    subscription: Stripe.Subscription,
  ) => Promise<void>;
  onSubscriptionDeleted: (subscription: Stripe.Subscription) => Promise<void>;
  onSubscriptionUpdated: (subscription: Stripe.Subscription) => Promise<void>;
};
