import { api } from "@/utils/api";

import { useRouter } from "next/router";

import { getIsPathAppPath } from "@/utils/paths";

type Options = {
  disabled?: boolean;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useBadges = (options?: Options) =>
{
  const { pathname } = useRouter();
  const isEnabledForCurrentPath = getIsPathAppPath(pathname);

  const { data, error, isLoading } = api.badges.getBadges.useQuery(undefined, {
    enabled: isEnabledForCurrentPath && !options?.disabled,
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
    retry: false,
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
