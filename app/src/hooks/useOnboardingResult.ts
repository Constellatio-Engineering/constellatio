import { type User } from "@/db/schema";
import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

type UseOnboardingResult = () => UseQueryResult<{ onboardingResult: User["onboardingResult"] }>;

const useOnboardingResult: UseOnboardingResult = () =>
{
  const { data: onboardingResult, error, isLoading } = api.users.getOnboardingResult.useQuery(undefined, {
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
