import { type AllCases } from "@/services/content/getAllCases";
import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

type UseCases = () => UseQueryResult<{ allCases: AllCases }>;

const useCases: UseCases = () =>
{
  const { data: allCases, error, isLoading } = api.caisy.getAllCases.useQuery();

  return {
    allCases: allCases ?? [],
    error,
    isLoading
  };
};

export default useCases;
