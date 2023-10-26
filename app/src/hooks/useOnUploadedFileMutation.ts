import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { paths } from "@/utils/paths";

import { useRouter } from "next/router";
import { useCallback } from "react";

type OnUploadedFileMutation = (params: { folderId: string | null }) => Promise<void>;

type UseOnUploadedFileMutation = () => {
  onUploadedFileMutation: OnUploadedFileMutation;
};

export const useOnUploadedFileMutation: UseOnUploadedFileMutation = () =>
{
  const { invalidateSearchResults, invalidateUploadedFiles } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const { pathname } = useRouter();

  const onUploadedFileMutation: OnUploadedFileMutation = useCallback(async ({ folderId }) =>
  {
    if(pathname.startsWith(paths.search))
    {
      console.log("invalidating search results");
      await invalidateSearchResults();
    }
    else 
    {
      console.log("not invalidating search results");
    }
    await invalidateUploadedFiles({ folderId });
  }, [invalidateSearchResults, invalidateUploadedFiles, pathname]);

  return { onUploadedFileMutation };
};
