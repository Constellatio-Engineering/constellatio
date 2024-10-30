import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

import { type inferProcedureOutput } from "@trpc/server";

import { type usersRouter } from "@/server/api/routers/user.router";

type UseUserDetails = () => UseQueryResult<{
  userDetails: inferProcedureOutput<typeof usersRouter["getUserDetails"]> | undefined;
}>;

const useUserDetails: UseUserDetails = () =>
{
  const { data: userDetails, error, isLoading } = api.users.getUserDetails.useQuery(undefined, {
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
    retry: false,
    staleTime: Infinity
  });
  
  return {
    error,
    isLoading,
    userDetails
  };
};

export default useUserDetails;
