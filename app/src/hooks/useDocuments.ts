import { type Document } from "@/db/schema";
import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

type UseDocuments = (folderId: string | null) => UseQueryResult<{ documents: Document[] }>;

const useDocuments: UseDocuments = (folderId) =>
{
  const { data: documents = [], error, isLoading } = api.documents.getDocuments.useQuery({ folderId }, {
    refetchOnMount: "always",
    staleTime: Infinity
  });
  
  return { 
    documents: documents ?? [],
    error,
    isLoading
  };
};

export default useDocuments;
