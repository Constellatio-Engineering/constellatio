import { api } from "@/utils/api";

export const useInitialTags = () =>
{
  return api.caisy.getInitialTags.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};
