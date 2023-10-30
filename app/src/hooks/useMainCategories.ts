import { api } from "@/utils/api";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useMainCategories = () =>
{
  const { data: allMainCategories, error, isLoading } = api.caisy.getAllMainCategories.useQuery();

  return {
    allMainCategories: allMainCategories ?? [],
    error,
    isLoading
  };
};

export default useMainCategories;
