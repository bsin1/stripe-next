"use client";

import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

interface Props {
  apiBaseUrl: string;
  getCurrentUser: () => Promise<{ email: string; id: string }>;
}

export const SubscriptionPlans = ({ apiBaseUrl, getCurrentUser }: Props) => {
  const [plans, setPlans] = useState<any[]>([]);

  useEffect(() => {
    const loadPlans = async () => {
      const response = await fetch(`${apiBaseUrl}/subscription/plans`);

      const { data } = await response.json();

      setPlans(data);
    };
    loadPlans();
  }, []);

  const handleSubscribe = async (priceId: string) => {
    console.log("HANDLE SUBSCRIBE: ", priceId);

    const url = new URL(window.location.href).origin;

    const response = await fetch(`${apiBaseUrl}/checkout/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priceId,
        cancelRedirectUrl: window.location.href,
        successRedirectUrl: `${url}${apiBaseUrl}/checkout/redirect`,
      }),
    });

    const { data } = await response.json();

    const stripe = await stripePromise;

    const result = await stripe?.redirectToCheckout({ sessionId: data });

    if (result?.error) {
      console.error(result.error);
    }
  };

  return (
    <div className="bg-gray-50">
      {plans.length == 0 && (
        <div className="spinner border-black border-b-transparent"></div>
      )}
      {plans.map((plan) => (
        <div key={plan.id} className="flex flex-col rounded-lg">
          <h2 className="w-full text-center text-2xl font-semibold text-gray-800">
            {plan.name}
          </h2>
          <p className="mt-2 text-center text-gray-600">{plan.description}</p>
          <div className="mt-2 text-center">
            <span className="text-3xl font-bold text-gray-900">
              ${(plan.price / 100).toFixed(2)}
            </span>
            <span className="ml-2 text-gray-500">/ {plan.interval}</span>
          </div>
          <div className="mt-2"> </div>
          <PrimaryButton
            onClick={() => handleSubscribe(plan.id)}
            disabled={false}
            title="Subscribe"
          />
        </div>
      ))}
    </div>
  );
};
