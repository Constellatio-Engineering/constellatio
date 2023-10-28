import { api } from "@/utils/api";

const useBadges = () =>
{
  const { data: badges, error, isLoading } = api.badges.getBadges.useQuery(undefined, {
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
    // staleTime: Infinity
  });

  return {
    error,
    getBadgesResult: {
      badges: badges?.badges ?? [],
      completedCount: badges?.completedCount ?? 0,
      totalCount: badges?.totalCount ?? 0,
    },
    isLoading
  };
};

export default useBadges;
