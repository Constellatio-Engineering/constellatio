// import { type IGenArticle } from "@constellatio/cms/generated-types";
import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

import { type allArticles } from "@constellatio/cms/content/getAllArticles";

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
