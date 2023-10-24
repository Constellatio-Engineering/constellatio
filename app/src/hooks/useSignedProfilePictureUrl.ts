import useUserDetails from "@/hooks/useUserDetails";
import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

import { useEffect } from "react";

type UseSignedProfilePictureUrl = () => UseQueryResult<{ url: string | undefined}>;

const useSignedProfilePictureUrl: UseSignedProfilePictureUrl = () =>
{
  const { userDetails } = useUserDetails();
  const profilePictureFileId = userDetails?.profilePicture?.id;

  const {
    data: url,
    error,
    isLoading,
    mutate: createSignedGetUrl
  } = api.users.createSignedProfilePictureUrl.useMutation();

  useEffect(() =>
  {
    console.log("useEffect", createSignedGetUrl, profilePictureFileId);

    if(profilePictureFileId)
    {
      createSignedGetUrl({ fileId: profilePictureFileId });
    }
  }, [createSignedGetUrl, profilePictureFileId]);

  return {
    error,
    isLoading,
    url
  };
};

export default useSignedProfilePictureUrl;
