import { api } from "@/utils/api";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useBadges = () =>
{
  const { data, error, isLoading } = api.badges.getBadges.useQuery(undefined, {
    refetchOnMount: "always",
    refetchOnWindowFocus: "always", // TODO
    // staleTime: Infinity
  });

  return {
    error,
    getBadgesResult: {
      badges: data?.badges ?? [],
      completedCount: data?.completedCount ?? 0,
      totalCount: data?.totalCount ?? 0,
    },
    isLoading
  };
};

export default useBadges;
