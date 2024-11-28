import { AuthStateContext } from "@/provider/AuthStateProvider";
import useMaterialsStore from "@/stores/materials.store";
import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

import { type GetUploadedFilesResult } from "@constellatio/api/routers/uploads.router";
import { useContext } from "react";

type UseUploadedFiles = () => UseQueryResult<{
  uploadedFilesInAllFolders: GetUploadedFilesResult;
  uploadedFilesInSelectedFolder: GetUploadedFilesResult;
}>;

const useUploadedFiles: UseUploadedFiles = () =>
{
  const { isUserLoggedIn } = useContext(AuthStateContext);
  const selectedFolderId = useMaterialsStore(s => s.selectedFolderId);

  const { data: uploadedFiles = [], error, isLoading } = api.uploads.getUploadedFiles.useQuery({ folderId: undefined }, {
    enabled: isUserLoggedIn ?? false,
    refetchOnMount: "always",
    staleTime: Infinity
  });

  return {
    error,
    isLoading,
    uploadedFilesInAllFolders: uploadedFiles ?? [],
    uploadedFilesInSelectedFolder: (
      selectedFolderId === undefined
        ? uploadedFiles
        : uploadedFiles.filter((file) => file.folderId === selectedFolderId)
    ) ?? []
  };
};

export default useUploadedFiles;
