import useUserDetails from "@/hooks/useUserDetails";
import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

type UseSignedProfilePictureUrl = () => UseQueryResult<{ url: string | undefined}>;

const useSignedProfilePictureUrl: UseSignedProfilePictureUrl = () =>
{
  const { userDetails } = useUserDetails();
  const profilePictureFileId = userDetails?.profilePicture?.id;

  const { data: url, error, isLoading } = api.users.getSignedProfilePictureUrl.useQuery({ fileId: profilePictureFileId! }, {
    enabled: profilePictureFileId != null,
    staleTime: Infinity,
  });

  return {
    error,
    isLoading,
    url
  };
};

export default useSignedProfilePictureUrl;
