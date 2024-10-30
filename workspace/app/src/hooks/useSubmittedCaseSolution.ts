import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

import { type CaseSolution } from "@constellatio/db/schema";
import { type Nullable } from "@constellatio/utility-types";

type UseSubmittedCaseSolution = (caseId: Nullable<string>) => UseQueryResult<{ submittedCaseSolution: Nullable<CaseSolution> }>;

const useSubmittedCaseSolution: UseSubmittedCaseSolution = (caseId) =>
{
  const { data: caseSolution, error, isLoading } = api.casesProgress.getSubmittedSolution.useQuery({ caseId: caseId! }, {
    enabled: caseId != null,
  });

  return {
    error,
    isLoading,
    submittedCaseSolution: caseSolution
  };
};

export default useSubmittedCaseSolution;
