import { type Bookmark, type BookmarkResourceType } from "@/db/schema";
import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

type UseBookmarks = (resourceType: BookmarkResourceType | undefined) => UseQueryResult<{ bookmarks: Bookmark[] }>;

const useBookmarks: UseBookmarks = (resourceType) =>
{
  const { data: bookmarks, error, isLoading } = api.bookmarks.getAllBookmarks.useQuery({ resourceType }, {
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
