import { type UploadFolder } from "@/db/schema";
import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

type UseUploadFolders = () => UseQueryResult<{ folders: UploadFolder[] }>;

const useUploadFolders: UseUploadFolders = () =>
{
  const { data: folders = [], error, isLoading } = api.uploads.getFolders.useQuery(undefined, {
    refetchOnMount: "always",
    staleTime: Infinity
  });
  
  return {
    error,
    folders: folders ?? [],
    isLoading 
  };
};

export default useUploadFolders;
