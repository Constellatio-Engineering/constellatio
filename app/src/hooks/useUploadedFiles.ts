import { type UploadedFile } from "@/db/schema";
import useMaterialsStore from "@/stores/materials.store";
import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

type UseUploadedFiles = () => UseQueryResult<{
  uploadedFilesInAllFolders: UploadedFile[];
  uploadedFilesInSelectedFolder: UploadedFile[];
}>;

const useUploadedFiles: UseUploadedFiles = () =>
{
  const selectedFolderId = useMaterialsStore(s => s.selectedFolderId);

  const { data: uploadedFiles = [], error, isLoading } = api.uploads.getUploadedFiles.useQuery({ folderId: undefined }, {
    refetchOnMount: "always",
    staleTime: Infinity
  });

  return {
    error,
    isLoading,
    uploadedFilesInAllFolders: uploadedFiles ?? [],
    uploadedFilesInSelectedFolder: uploadedFiles.filter((file) => file.folderId === selectedFolderId) ?? []
  };
};

export default useUploadedFiles;
