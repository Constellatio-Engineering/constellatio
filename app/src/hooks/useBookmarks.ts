import { type BookmarkResourceType } from "@/db/schema";
import { type AppRouter } from "@/server/api/root";
import { api } from "@/utils/api";
import { type BookmarkFiltered } from "@/utils/filters";
import { type UseQueryResult } from "@/utils/types";

import { type inferReactQueryProcedureOptions } from "@trpc/react-query";

type UseBookmarks = (
  resourceType: BookmarkResourceType | undefined,
  options?: inferReactQueryProcedureOptions<AppRouter>["bookmarks"]["getAllBookmarks"]
) => UseQueryResult<{ bookmarks: BookmarkFiltered[] }>;

const useBookmarks: UseBookmarks = (resourceType, options) =>
{
  const { data: bookmarks, error, isLoading } = api.bookmarks.getAllBookmarks.useQuery({ resourceType }, {
    ...options,
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
