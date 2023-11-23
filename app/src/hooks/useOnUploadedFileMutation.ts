import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { paths } from "@/utils/paths";

import { useRouter } from "next/router";
import { useCallback } from "react";

type OnUploadedFileMutation = () => Promise<void>;

type UseOnUploadedFileMutation = () => {
  onUploadedFileMutation: OnUploadedFileMutation;
};

export const useOnUploadedFileMutation: UseOnUploadedFileMutation = () =>
{
  const { invalidateSearchResults, invalidateUploadedFiles } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const { pathname } = useRouter();

  const onUploadedFileMutation: OnUploadedFileMutation = useCallback(async () =>
  {
    if(pathname.startsWith(paths.search))
    {
      await invalidateSearchResults();
    }
    await invalidateUploadedFiles();
  }, [invalidateSearchResults, invalidateUploadedFiles, pathname]);

  return { onUploadedFileMutation };
};
