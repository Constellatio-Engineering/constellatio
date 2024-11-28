import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { api } from "@/utils/api";

import useContextAndErrorIfNull from "./useContextAndErrorIfNull";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useAddBookmark = () =>
{
  const utils = api.useUtils();
  const { invalidateBookmarks } = useContextAndErrorIfNull(InvalidateQueriesContext);

  return api.bookmarks.addBookmark.useMutation({
    onError: (err, newBookmark, context) =>
    {
      // type of context is inferred as unknown for some reason
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      utils.bookmarks.getAllBookmarks.setData(undefined, (context as any).previousBookmarks);
      console.log("Something went wrong while adding bookmark: ", { context, err, newBookmark });
    },
    onMutate: async (newBookmark) =>
    {
      await utils.bookmarks.getAllBookmarks.cancel();
      const previousBookmarks = utils.bookmarks.getAllBookmarks.getData();
      utils.bookmarks.getAllBookmarks.setData({ resourceType: newBookmark.resourceType }, (oldBookmarks = []) =>
      {
        return [...oldBookmarks, newBookmark];
      });

      return { previousBookmarks: previousBookmarks ?? [] };
    },
    onSettled: invalidateBookmarks
  });
};

export default useAddBookmark;
