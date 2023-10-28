import { api } from "@/utils/api";

const useBadges = () =>
{
  const { data: badges, error, isLoading } = api.badges.getBadges.useQuery(undefined, {
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
    // staleTime: Infinity
  });

  console.log("badges", badges);

  return {
    badges: badges ?? [],
    error,
    isLoading
  };
};

export default useBadges;
