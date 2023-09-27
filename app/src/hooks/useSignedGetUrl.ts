import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

type UseSignedGetUrl = (fileId: string) => UseQueryResult<{ url: string | undefined}>;

const useSignedGetUrl: UseSignedGetUrl = (fileId) =>
{
  const { data: url, error, isLoading } = api.uploads.createSignedGetUrl.useQuery({ fileId }, {
    staleTime: 1000 * 60 * 10,
  });

  return {
    error,
    isLoading,
    url
  };
};

export default useSignedGetUrl;
