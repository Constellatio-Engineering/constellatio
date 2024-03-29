import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

import { useEffect } from "react";

type UseSignedGetUrl = (fileId: string | undefined) => UseQueryResult<{ url: string | undefined}>;

const useSignedGetUrl: UseSignedGetUrl = (fileId) =>
{
  const {
    data: url,
    error,
    isPending,
    mutate: createSignedGetUrl
  } = api.uploads.createSignedGetUrl.useMutation();

  useEffect(() =>
  {
    if(fileId)
    {
      createSignedGetUrl({ fileId });
    }
  }, [createSignedGetUrl, fileId]);

  return {
    error,
    isLoading: isPending,
    url
  };
};

export default useSignedGetUrl;
