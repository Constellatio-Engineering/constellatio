import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

import { type UploadFolder } from "@constellatio/db/schema";

type UseUploadFolders = () => UseQueryResult<{ folders: UploadFolder[] }>;

const useUploadFolders: UseUploadFolders = () =>
{
  const { data: folders = [], error, isLoading } = api.folders.getFolders.useQuery(undefined, {
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
