import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { api } from "@/utils/api";

import useContextAndErrorIfNull from "./useContextAndErrorIfNull";

export const useAddContentItemView = () =>
{
  const { invalidateContentItemsViewsCount, invalidateSeenArticles } = useContextAndErrorIfNull(InvalidateQueriesContext);

  return api.views.addContentItemView.useMutation({
    onSuccess: (_data, variables) =>
    {
      if(variables.itemType === "article")
      {
        void invalidateSeenArticles();
      }

      void invalidateContentItemsViewsCount(variables);
    }
  });
};
