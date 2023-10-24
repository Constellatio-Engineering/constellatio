import { type usersRouter } from "@/server/api/routers/user.router";
import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

import { type inferProcedureOutput } from "@trpc/server";

type UseUserDetails = () => UseQueryResult<{
  userDetails: inferProcedureOutput<typeof usersRouter["getUserDetails"]> | undefined;
}>;

const useUserDetails: UseUserDetails = () =>
{
  const { data: userDetails, error, isLoading } = api.users.getUserDetails.useQuery(undefined, {
    staleTime: Infinity
  });
  
  return {
    error,
    isLoading,
    userDetails
  };
};

export default useUserDetails;
