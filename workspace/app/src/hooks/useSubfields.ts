import { api } from "@/utils/api";

export const useSubfields = () =>
{
  return api.caisy.getAllSubfields.useQuery(undefined, {
    staleTime: Infinity,
  });
};
