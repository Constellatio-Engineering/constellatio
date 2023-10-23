
import { type SubscriptionStatus } from "@/db/schema";
import { api } from "@/utils/api";

type UseSubscription = (
) => {
  generateStripeSessionUrl: () => Promise<{ stripeUrl: string | null }>;
  isSessionLoading: boolean;
  isSubscriptionDetailsLoading: boolean;
  subscriptionDetails: {
    subscribedPlanPriceId: string | null;
    subscriptionEndDate: Date | null;
    subscriptionStartDate: Date | null;
    subscriptionStatus: SubscriptionStatus | null;
  } ;
};

const useSubscription: UseSubscription = () =>
{
  const { data: subscriptionDetails, isLoading: isSubscriptionDetailsLoading } = api.billing.getSubscriptionDetails.useQuery();

  const { isLoading: isSessionLoading, mutateAsync: generateStripeSessionUrl } = api.billing.generateStripeCheckoutSession.useMutation();

  return {
    generateStripeSessionUrl,
    isSessionLoading, 
    isSubscriptionDetailsLoading,
    subscriptionDetails: subscriptionDetails ?? {
      subscribedPlanPriceId: null,
      subscriptionEndDate: null,
      subscriptionStartDate: null,
      subscriptionStatus: null
    }
  };
};

export default useSubscription;
