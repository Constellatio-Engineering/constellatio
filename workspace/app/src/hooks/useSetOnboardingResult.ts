import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { api } from "@/utils/api";

import useContextAndErrorIfNull from "./useContextAndErrorIfNull";

const useSetOnboardingResult = () =>
{
  const { invalidateOnboardingResult } = useContextAndErrorIfNull(InvalidateQueriesContext);

  const { mutateAsync: setOnboardingResult } = api.users.setOnboardingResult.useMutation({
    onError: (error) => console.error("Error while setting onboarding result", error),
    onSuccess: async () => invalidateOnboardingResult()
  });

  return { setOnboardingResult };
};

export default useSetOnboardingResult;
