import {
  DEFAULT_API_PATH,
  StripeNextOptions,
  StripeRouteHandlers,
} from "./types";
import {
  SubscribeModal,
  SubscribeModalProps,
} from "./components/SubscribeModal";
import { BillingPortalButton } from "./components/BillingPortalButton";
import React from "react";
import { createStripeHandlers } from "./utils";

interface StripeNext {
  handlers: StripeRouteHandlers;
  BillingPortalButton: () => React.ReactNode;
  SubscribeModal: (
    props: Omit<SubscribeModalProps, "getCurrentUser" | "apiBaseUrl">,
  ) => React.ReactNode;
}

export const CreateStripeNext = (options: StripeNextOptions): StripeNext => ({
  handlers: createStripeHandlers(options),
  BillingPortalButton: () => {
    return (
      <BillingPortalButton
        apiBaseUrl={options.apiBaseUrl ?? DEFAULT_API_PATH}
      />
    );
  },
  SubscribeModal: ({ handleClose, open, title }) => (
    <SubscribeModal
      apiBaseUrl={options.apiBaseUrl ?? DEFAULT_API_PATH}
      getCurrentUser={options.getCurrentUser}
      handleClose={handleClose}
      open={open}
      title={title}
    />
  ),
});
