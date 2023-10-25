import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { paths } from "@/utils/paths";

import { useRouter } from "next/router";
import { useCallback } from "react";

type UseOnUploadedFileMutation = (params: {
  folderId: string | null;
}) => {
  onUploadedFileMutation: () => Promise<void>;
};

export const useOnUploadedFileMutation: UseOnUploadedFileMutation = ({ folderId }) =>
{
  const { invalidateSearchResults, invalidateUploadedFiles } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const { pathname } = useRouter();

  const onUploadedFileMutation = useCallback(async () =>
  {
    if(pathname.startsWith(paths.search))
    {
      await invalidateSearchResults();
    }
    await invalidateUploadedFiles({ folderId });
  }, [folderId, invalidateSearchResults, invalidateUploadedFiles, pathname]);

  return { onUploadedFileMutation };
};
