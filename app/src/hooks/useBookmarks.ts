import { type Bookmark, type BookmarkResourceType } from "@/db/schema";
import { type AppRouter } from "@/server/api/root";
import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

import { type inferReactQueryProcedureOptions } from "@trpc/react-query";

type UseBookmarks = (
  resourceType: BookmarkResourceType | undefined,
  options?: inferReactQueryProcedureOptions<AppRouter>["bookmarks"]["getAllBookmarks"]
) => UseQueryResult<{ bookmarks: Bookmark[] }>;

const useBookmarks: UseBookmarks = (resourceType, options) =>
{
  const { data: bookmarks, error, isLoading } = api.bookmarks.getAllBookmarks.useQuery({ resourceType }, {
    ...options,
    queryKey: ["bookmarks.getAllBookmarks", { resourceType }],
    refetchOnMount: "always",
    staleTime: Infinity
  });

  return {
    bookmarks: bookmarks ?? [],
    error,
    isLoading
  };
};

export default useBookmarks;
