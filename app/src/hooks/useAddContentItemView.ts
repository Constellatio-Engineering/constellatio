import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { api } from "@/utils/api";

import useContextAndErrorIfNull from "./useContextAndErrorIfNull";

export const useAddContentItemView = () =>
{
  const { invalidateContentItemsViewsCount } = useContextAndErrorIfNull(InvalidateQueriesContext);

  return api.views.addContentItemView.useMutation({
    onSuccess: async (_data, variables) => invalidateContentItemsViewsCount(variables)
  });
};
