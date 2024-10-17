import useCases from "@/hooks/useCases";
import { api } from "@/utils/api";

export const useLastViewedCases = () =>
{
  const {
    data: lastViewedCases = [],
    error: getLastViewedCasesError,
    isLoading: isGetLastViewedCasesLoading
  } = api.views.getLastViewedContentItems.useQuery({ itemType: "case" });
  const { allCases, error: getCasesError, isLoading: isGetAllCasesLoading } = useCases();

  const cases = lastViewedCases
    .map(({ itemId, viewedDate }) =>
    {
      const legalCase = allCases.find(({ id }) => id === itemId);

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
