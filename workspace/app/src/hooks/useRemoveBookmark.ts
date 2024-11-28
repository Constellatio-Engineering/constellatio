import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { api } from "@/utils/api";

import useContextAndErrorIfNull from "./useContextAndErrorIfNull";

type Params = {
  shouldUseOptimisticUpdate: boolean;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useRemoveBookmark = ({ shouldUseOptimisticUpdate }: Params) =>
{
  const utils = api.useUtils();
  const { invalidateBookmarks } = useContextAndErrorIfNull(InvalidateQueriesContext);

  if(!shouldUseOptimisticUpdate)
  {
    return api.bookmarks.removeBookmark.useMutation({ onSuccess: invalidateBookmarks });
  }

  return api.bookmarks.removeBookmark.useMutation({
    onError: (err, bookmarkToRemove, context) =>
    {
      // type of context is inferred as unknown for some reason
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      utils.bookmarks.getAllBookmarks.setData(undefined, (context as any).previousBookmarks);
      console.log("Something went wrong while removing bookmark: ", { bookmarkToRemove, context, err });
    },
    onMutate: async (bookmarkToRemove) =>
    {
      await utils.bookmarks.getAllBookmarks.cancel();
      const previousBookmarks = utils.bookmarks.getAllBookmarks.getData();
      utils.bookmarks.getAllBookmarks.setData({ resourceType: bookmarkToRemove.resourceType }, (oldBookmarks = []) =>
      {
        const bookmarksWithoutRemovedBookmark = oldBookmarks.filter((bookmark) => bookmark.resourceId !== bookmarkToRemove.resourceId);
        return bookmarksWithoutRemovedBookmark;
      });

      return { previousBookmarks: previousBookmarks ?? [] };
    },
    onSettled: invalidateBookmarks,
  });
};

export default useRemoveBookmark;
