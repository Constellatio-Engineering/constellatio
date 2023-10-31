import { api } from "@/utils/api";
import { type Path } from "@/utils/paths";

import { useRouter } from "next/router";
import { useMemo } from "react";

type Options = {
  disabled?: boolean;
};

export const disabledForPaths: Path[] = [
  "/confirm",
  "/confirm-email-change",
  "/recover",
  "/register",
  "/login",
  "/payment-success"
];

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useBadges = (options?: Options) =>
{
  const router = useRouter();
  const isDisabledForCurrentPath = useMemo(
    () => disabledForPaths.some((path) => router.pathname.startsWith(path)),
    [router.pathname]
  );

  const { data, error, isLoading } = api.badges.getBadges.useQuery(undefined, {
    enabled: !isDisabledForCurrentPath && !options?.disabled,
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
