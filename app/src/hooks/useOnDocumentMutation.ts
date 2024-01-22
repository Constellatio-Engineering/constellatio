import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { appPaths } from "@/utils/paths";

import { useRouter } from "next/router";
import { useCallback } from "react";

type OnDocumentMutation = () => Promise<void>;

type UseOnDocumentMutation = () => {
  onDocumentMutation: OnDocumentMutation;
};

export const useOnDocumentMutation: UseOnDocumentMutation = () =>
{
  const { invalidateDocuments, invalidateSearchResults } = useContextAndErrorIfNull(InvalidateQueriesContext);
  const { pathname } = useRouter();

  const onDocumentMutation: OnDocumentMutation = useCallback(async () =>
  {
    if(pathname.startsWith(appPaths.search))
    {
      await invalidateSearchResults();
    }
    await invalidateDocuments();
  }, [invalidateDocuments, invalidateSearchResults, pathname]);

  return { onDocumentMutation };
};
