import { type Document } from "@/db/schema";
import useMaterialsStore from "@/stores/materials.store";
import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

import { keepPreviousData } from "@tanstack/react-query";

type UseDocuments = () => UseQueryResult<{
  documentsInAllFolders: Document[];
  documentsInSelectedFolder: Document[];
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
