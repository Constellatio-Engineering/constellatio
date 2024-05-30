import { type GetDocumentsResult } from "@/server/api/routers/documents.router";
import useMaterialsStore from "@/stores/materials.store";
import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

import { keepPreviousData } from "@tanstack/react-query";
import { useEffect } from "react";

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
    refetchOnMount: "always",
    staleTime: Infinity
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
