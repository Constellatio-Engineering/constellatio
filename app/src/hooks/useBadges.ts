import { api } from "@/utils/api";

type Options = {
  disabled?: boolean;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useBadges = (options?: Options) =>
{
  const { data, error, isLoading } = api.badges.getBadges.useQuery(undefined, {
    enabled: !options?.disabled,
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
    staleTime: Infinity
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
