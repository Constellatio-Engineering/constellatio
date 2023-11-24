import { type User } from "@/db/schema";
import { AuthStateContext } from "@/provider/AuthStateProvider";
import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

import { useContext } from "react";

type UseOnboardingResult = () => UseQueryResult<{ onboardingResult: User["onboardingResult"] }>;

const useOnboardingResult: UseOnboardingResult = () =>
{
  const { isUserLoggedIn } = useContext(AuthStateContext);

  const { data: onboardingResult, error, isLoading } = api.users.getOnboardingResult.useQuery(undefined, {
    enabled: isUserLoggedIn ?? false,
    refetchOnMount: "always",
    staleTime: Infinity
  });

  return {
    error,
    isLoading,
    onboardingResult: onboardingResult ?? null
  };
};

export default useOnboardingResult;
