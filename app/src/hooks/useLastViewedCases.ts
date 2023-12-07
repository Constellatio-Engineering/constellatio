import useCases from "@/hooks/useCases";
import { type IGenCase } from "@/services/graphql/__generated/sdk";
import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

type UseLastViewedCases = () => UseQueryResult<{ lastViewedCases: IGenCase[] }>;

export const useLastViewedCases: UseLastViewedCases = () =>
{
  const {
    data: lastViewedCasesIds = [],
    error: getLastViewedCasesError,
    isLoading: isGetLastViewedCasesLoading
  } = api.views.getLastViewedCases.useQuery();
  const { allCases, error: getCasesError, isLoading: isGetAllCasesLoading } = useCases();
  const lastViewedCases: IGenCase[] = lastViewedCasesIds
    .map((lastViewedCaseId) => allCases.find(({ id }) => id === lastViewedCaseId))
    .filter(Boolean);

  return {
    error: getLastViewedCasesError || getCasesError,
    isLoading: isGetLastViewedCasesLoading || isGetAllCasesLoading,
    lastViewedCases,
  };
};
