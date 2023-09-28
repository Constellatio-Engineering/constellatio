import { type Upload } from "@/db/schema";
import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

type UseUploadedFiles = () => UseQueryResult<{ uploadedFiles: Upload[] }>;

const useUploadedFiles: UseUploadedFiles = () =>
{
  const { data: uploadedFiles = [], error, isLoading } = api.uploads.getUploadedFiles.useQuery(undefined, {
    refetchOnMount: "always",
    staleTime: Infinity
  });
  
  return {
    error,
    isLoading,
    uploadedFiles: uploadedFiles ?? []
  };
};

export default useUploadedFiles;
