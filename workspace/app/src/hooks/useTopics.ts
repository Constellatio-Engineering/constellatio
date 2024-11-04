import { api } from "@/utils/api";

export const useTopics = () =>
{
  return api.caisy.getAllTopics.useQuery(undefined, {
    staleTime: Infinity,
  });
};
