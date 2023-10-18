import { type CaseSolution } from "@/db/schema";
import { api } from "@/utils/api";
import { type Nullable, type UseQueryResult } from "@/utils/types";

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
