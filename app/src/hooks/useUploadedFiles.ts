import { type UploadedFile } from "@/db/schema";
import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

// folderId = null --> get file in default folder
// folderId = undefined --> get files in all folders
type UseUploadedFiles = (folderId: string | null | undefined) => UseQueryResult<{ uploadedFiles: UploadedFile[] }>;

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
