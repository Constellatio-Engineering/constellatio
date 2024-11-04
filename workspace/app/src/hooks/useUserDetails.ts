import { api } from "@/utils/api";

const useUserDetails = () =>
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
