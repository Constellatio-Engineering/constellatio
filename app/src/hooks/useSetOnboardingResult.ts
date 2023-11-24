import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { api } from "@/utils/api";

import useContextAndErrorIfNull from "./useContextAndErrorIfNull";

// Don't know how to infer the type of setOnboardingResult
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
