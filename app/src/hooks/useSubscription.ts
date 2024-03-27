import { AuthStateContext } from "@/provider/AuthStateProvider";
import { api } from "@/utils/api";

import { useContext } from "react";

const useSubscription = () =>
{
  const { isUserLoggedIn } = useContext(AuthStateContext);

  return api.billing.getSubscriptionDetails.useQuery(undefined, {
    enabled: isUserLoggedIn ?? false,
    refetchInterval: 1000 * 60 * 5,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: false,
  });
};

export default useSubscription;
