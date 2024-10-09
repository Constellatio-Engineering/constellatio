import useCases from "@/hooks/useCases";
import { type IGenCase } from "@/services/graphql/__generated/sdk";
import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

export const useLastViewedCases = () =>
{
  const {
    data: lastViewedCases = [],
    error: getLastViewedCasesError,
    isLoading: isGetLastViewedCasesLoading
  } = api.views.getLastViewedCases.useQuery();
  const { allCases, error: getCasesError, isLoading: isGetAllCasesLoading } = useCases();

  const cases = lastViewedCases
    .map(({ caseId, viewedDate }) =>
    {
      const legalCase = allCases.find(({ id }) => id === caseId);

      if(!legalCase)
      {
        return null;
      }

      return {
        ...legalCase,
        viewedDate,
      };
    })
    .filter(Boolean);

  return {
    error: getLastViewedCasesError || getCasesError,
    isLoading: isGetLastViewedCasesLoading || isGetAllCasesLoading,
    lastViewedCases: cases,
  };
};
