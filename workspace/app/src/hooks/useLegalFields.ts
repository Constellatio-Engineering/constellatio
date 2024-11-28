import { api } from "@/utils/api";

export const useLegalFields = () =>
{
  return api.caisy.getAllLegalFields.useQuery(undefined, {
    staleTime: Infinity,
  });
};
