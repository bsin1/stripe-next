import { NextRequest } from "next/server";
import {
  DEFAULT_API_PATH,
  SECTION_ACTION_MAP,
  StripeNextOptions,
  StripeRequest,
  StripeRouteHandlers,
} from "./types";
import { createCheckoutSession } from "./api/createCheckoutSession";
import { checkoutRedirect } from "./api/checkoutRedirect";
import { createBillingPortalUrl } from "./api/createBillingPortalUrl";
import { getSubscriptionPlans } from "./api/getSubscriptionPlans";
import { handleWebhooks } from "./api/webhooks";

export const createStripeHandlers = (
  options: StripeNextOptions,
): StripeRouteHandlers => {
  const httpHandler = async (req: NextRequest): Promise<Response> => {
    const url = new URL(req.url);

    const { section, action } = parseStripeRequest(
      url.pathname,
      options.apiBaseUrl ?? DEFAULT_API_PATH,
    );

    switch (section) {
      case "checkout": {
        switch (action) {
          case "create":
            return createCheckoutSession(req, options.getCurrentUser);
          case "redirect":
            return checkoutRedirect(req, options.onSubscriptionCreated);
          default:
            return Response.error();
        }
      }
      case "subscription": {
        switch (action) {
          case "manage":
            return createBillingPortalUrl(req, options.getCurrentCustomerId);
          case "plans":
            return getSubscriptionPlans(options.productFilter);
          default:
            return Response.error();
        }
      }
      case "webhooks":
        return handleWebhooks(
          req,
          options.onSubscriptionUpdated,
          options.onSubscriptionDeleted,
        );
      default:
        return Response.error();
    }
  };

  return {
    GET: httpHandler,
    POST: httpHandler,
  };
};

export const parseStripeRequest = (
  pathname: string,
  apiBaseUrl: string,
): StripeRequest => {
  const paths = pathname.replace(`${apiBaseUrl}/`, "");

  const [section, action] = paths.split("/");

  if (!(section in SECTION_ACTION_MAP)) {
    throw new Error("Invalid Section");
  }

  const validActions = SECTION_ACTION_MAP[section];
  if (validActions.length > 0 && !validActions.includes(action)) {
    throw new Error("Invalid Action");
  }

  return { action, section };
};
