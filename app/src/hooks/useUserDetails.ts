import { api } from "@/utils/api";
import { type UserFiltered } from "@/utils/filters";
import { type UseQueryResult } from "@/utils/types";

type UseUserDetails = () => UseQueryResult<{ userDetails: UserFiltered | undefined }>;

const useUserDetails: UseUserDetails = () =>
{
  const { data: userDetails, error, isLoading } = api.users.getUserDetails.useQuery(undefined, {
    refetchOnMount: "always",
    staleTime: Infinity
  });
  
  return {
    error,
    isLoading,
    userDetails
  };
};

export default useUserDetails;
