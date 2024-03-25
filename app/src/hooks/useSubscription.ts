import { AuthStateContext } from "@/provider/AuthStateProvider";
import { api } from "@/utils/api";
import { getHasSubscription } from "@/utils/subscription";

import { useContext } from "react";

const useSubscription = () =>
{
  const { isUserLoggedIn } = useContext(AuthStateContext);

  const { data: subscriptionDetails, isLoading: isSubscriptionDetailsLoading } = api.billing.getSubscriptionDetails.useQuery(undefined, {
    enabled: isUserLoggedIn ?? false,
    refetchOnMount: "always",
    retry: false,
  });

  const { mutateAsync: generateStripeBillingPortalSession } = api.billing.generateStripeBillingPortalSession.useMutation();
  const { mutateAsync: generateStripeCheckoutSession } = api.billing.generateStripeCheckoutSession.useMutation();
  const { isOnPaidSubscription, isOnTrailSubscription } = getHasSubscription(subscriptionDetails?.dbSubscription);

  return {
    generateStripeBillingPortalSession,
    generateStripeCheckoutSession,
    isOnPaidSubscription,
    isOnTrailSubscription,
    isSubscriptionDetailsLoading,
    subscriptionDetails
  };
};

export default useSubscription;
