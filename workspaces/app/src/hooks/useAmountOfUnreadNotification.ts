import { api } from "@/utils/api";

export const useAmountOfUnreadNotification = () =>
{
  return api.notifications.getAmountOfUnreadNotifications.useQuery(undefined, {
    refetchInterval: 1000 * 60,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    staleTime: Infinity,
  });
};
