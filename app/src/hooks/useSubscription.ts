import { AuthStateContext } from "@/provider/AuthStateProvider";
import { api } from "@/utils/api";
import { getHasSubscription } from "@/utils/subscription";

import { useContext } from "react";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useSubscription = () =>
{
  const { isUserLoggedIn } = useContext(AuthStateContext);

  const { data: subscriptionDetails, isLoading: isSubscriptionDetailsLoading } = api.billing.getSubscriptionDetails.useQuery(undefined, {
    enabled: isUserLoggedIn ?? false,
    refetchOnMount: "always",
    retry: false,
  });

  const { isLoading: isSessionLoading, mutateAsync: generateStripeSessionUrl } = api.billing.generateStripeCheckoutSession.useMutation();
  const { isOnPaidSubscription, isOnTrailSubscription } = getHasSubscription(subscriptionDetails);

  return {
    generateStripeSessionUrl,
    isOnPaidSubscription,
    isOnTrailSubscription,
    isSessionLoading, 
    isSubscriptionDetailsLoading,
    subscriptionDetails
  };
};

export default useSubscription;
