import { AuthStateContext } from "@/provider/AuthStateProvider";
import { api } from "@/utils/api";

import { useContext } from "react";

const useOnboardingResult = () =>
{
  const { isUserLoggedIn } = useContext(AuthStateContext);

  return api.users.getOnboardingResult.useQuery(undefined, {
    enabled: isUserLoggedIn ?? false,
    refetchOnMount: "always",
    staleTime: Infinity
  });
};

export default useOnboardingResult;
