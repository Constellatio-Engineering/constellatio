import { api } from "@/utils/api";
import { getHasSubscription } from "@/utils/subscription";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useSubscription = () =>
{
  const { data: subscriptionDetails, isLoading: isSubscriptionDetailsLoading } = api.billing.getSubscriptionDetails.useQuery();

  const { isLoading: isSessionLoading, mutateAsync: generateStripeSessionUrl } = api.billing.generateStripeCheckoutSession.useMutation();

  return {
    generateStripeSessionUrl,
    hasSubscription: getHasSubscription(subscriptionDetails),
    isSessionLoading, 
    isSubscriptionDetailsLoading,
    subscriptionDetails
  };
};

export default useSubscription;
