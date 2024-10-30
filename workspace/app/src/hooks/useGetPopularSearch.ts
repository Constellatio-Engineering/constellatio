import { api } from "@/utils/api";

import { type IGenSearch } from "@/services/graphql/__generated/sdk";

type UseGetPopularSearch = () => {
  error: unknown | null;
  isLoading: boolean;
  popularSearch: IGenSearch | undefined;
};

const useGetPopularSearch: UseGetPopularSearch = () =>
{
  const { data: popularSearch, error, isLoading } = api.search.getPopularSearch.useQuery();

  return { error, isLoading, popularSearch };
};

export default useGetPopularSearch;
