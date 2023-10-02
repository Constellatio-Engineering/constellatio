import { type Document } from "@/db/schema";
import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

type UseDocuments = (folderId: string | null) => UseQueryResult<{
  documents: Document[];
  isRefetching: boolean;
}>;

const useDocuments: UseDocuments = (folderId) =>
{
  const {
    data: documents = [],
    error,
    isLoading,
    isRefetching
  } = api.documents.getDocuments.useQuery({ folderId }, {
    keepPreviousData: true,
    refetchOnMount: "always",
    staleTime: Infinity
  });
  
  return { 
    documents: documents ?? [],
    error,
    isLoading,
    isRefetching
  };
};

export default useDocuments;
