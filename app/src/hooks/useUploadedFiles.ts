import { type UploadedFile } from "@/db/schema";
import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

type UseUploadedFiles = (folderId: string | null) => UseQueryResult<{ uploadedFiles: UploadedFile[] }>;

const useUploadedFiles: UseUploadedFiles = (folderId) =>
{
  const { data: uploadedFiles = [], error, isLoading } = api.uploads.getUploadedFiles.useQuery({ folderId }, {
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
