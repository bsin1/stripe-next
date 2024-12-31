"use server";

import { NextRequest } from "next/server";
import { stripe } from "../stripe";
import Stripe from "stripe";

export const checkoutRedirect = async (
  req: NextRequest,
  onSubscriptionSucccess: (
    userId: string,
    subscription: Stripe.Subscription,
  ) => Promise<any>,
): Promise<Response> => {
  console.log("checkoutRedirect");

  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    console.log("No session ID");
    return Response.error();
  }

  console.log("Session ID: ", sessionId);

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["subscription"],
    });

    console.log(session);
    let subscription: any = undefined;
    if (session.payment_status === "paid") {
      if (session.client_reference_id && session.subscription) {
        subscription = await onSubscriptionSucccess(
          session.client_reference_id,
          session.subscription as Stripe.Subscription,
        );
      }
    }
    console.log("REDIRECTING WITH SUBSCRIPTION: ", subscription);
    const url = new URL("/redirect", req.url);

    return Response.redirect(url);
  } catch (error) {
    console.log("CHECKOUT REDIRECT ERROR: ", error);
    return Response.error();
  }
};
