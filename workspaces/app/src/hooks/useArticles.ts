import { type allArticles } from "@/services/content/getAllArticles";
// import { type IGenArticle } from "@/services/graphql/__generated/sdk";
import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

type UseArticles = () => UseQueryResult<{ allArticles: allArticles }>;

const useArticles: UseArticles = () => 
{
  const { data: allArticles, error, isLoading } = api.caisy.getAllArticles.useQuery();

  return {
    allArticles: allArticles ?? [],
    error,
    isLoading
  };
};

export default useArticles;
