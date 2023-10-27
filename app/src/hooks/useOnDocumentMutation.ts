import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { paths } from "@/utils/paths";

import { useRouter } from "next/router";
import { useCallback } from "react";

type OnDocumentMutation = (params: { folderId: string | null }) => Promise<void>;

type UseOnDocumentMutation = () => {
  onDocumentMutation: OnDocumentMutation;
};

export const useOnDocumentMutation: UseOnDocumentMutation = () =>
{
  const { invalidateDocuments, invalidateSearchResults } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const { pathname } = useRouter();

  const onDocumentMutation: OnDocumentMutation = useCallback(async ({ folderId }) =>
  {
    if(pathname.startsWith(paths.search))
    {
      await invalidateSearchResults();
    }
    await invalidateDocuments({ folderId });
  }, [invalidateDocuments, invalidateSearchResults, pathname]);

  return { onDocumentMutation };
};
