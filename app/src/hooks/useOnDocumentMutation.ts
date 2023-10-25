import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { paths } from "@/utils/paths";

import { useRouter } from "next/router";
import { useCallback } from "react";

type UseOnDocumentMutation = (params: {
  folderId: string | null;
}) => {
  onDocumentMutation: () => Promise<void>;
};

export const useOnDocumentMutation: UseOnDocumentMutation = ({ folderId }) =>
{
  const { invalidateDocuments, invalidateSearchResults } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const { pathname } = useRouter();

  const onDocumentMutation = useCallback(async () =>
  {
    if(pathname.startsWith(paths.search))
    {
      await invalidateSearchResults();
    }
    await invalidateDocuments({ folderId });
  }, [folderId, invalidateDocuments, invalidateSearchResults, pathname]);

  return { onDocumentMutation };
};
