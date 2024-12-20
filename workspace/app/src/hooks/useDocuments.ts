import useMaterialsStore from "@/stores/materials.store";
import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

import { type GetDocumentsResult } from "@constellatio/api/routers/documents.router";
import { keepPreviousData } from "@tanstack/react-query";

type UseDocuments = () => UseQueryResult<{
  documentsInAllFolders: GetDocumentsResult;
  documentsInSelectedFolder: GetDocumentsResult;
  isRefetching: boolean;
}>;

const useDocuments: UseDocuments = () =>
{
  const selectedFolderId = useMaterialsStore(s => s.selectedFolderId);

  const {
    data: documents = [],
    error,
    isLoading,
    isRefetching
  } = api.documents.getDocuments.useQuery({ folderId: undefined }, {
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

  return {
    documentsInAllFolders: documents ?? [],
    documentsInSelectedFolder: (
      selectedFolderId === undefined
        ? documents
        : documents.filter((document) => document.folderId === selectedFolderId)
    ) ?? [],
    error,
    isLoading,
    isRefetching
  };
};

export default useDocuments;
