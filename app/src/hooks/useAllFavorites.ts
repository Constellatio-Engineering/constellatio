import { type IGenCase, type IGenArticle } from "@/services/graphql/__generated/sdk";

import useArticles from "./useArticles";
import useBookmarks from "./useBookmarks";
import useCases from "./useCases";

type Favorite = IGenArticle | IGenCase;
export type Favorites = Favorite[];

type UseAllFavorites = { 
  areArticlesLoading: boolean;
  bookmarkedArticles: IGenArticle[];
  bookmarkedCases: IGenCase[];
  favoritesList: Favorites;
  isUseBookmarksLoading: boolean;
  isUseCasesLoading: boolean;
};

const useAllFavorites = (): UseAllFavorites => 
{
  const { bookmarks, isLoading: isUseBookmarksLoading, } = useBookmarks(undefined);
  const allCasesBookmarks = bookmarks.filter(bookmark => bookmark?.resourceType === "case") ?? [];
  const { allCases = [], isLoading: isUseCasesLoading, } = useCases();
  const bookmarkedCases = allCases.filter(caisyCase => allCasesBookmarks.some(bookmark => bookmark.resourceId === caisyCase.id));
  const { allArticles = [], isLoading: areArticlesLoading } = useArticles(); 
  const allArticlesBookmarks = bookmarks.filter(bookmark => bookmark?.resourceType === "article") ?? [];
  const bookmarkedArticles = allArticles.filter((caisyArticle: IGenArticle) => allArticlesBookmarks.some(bookmark => bookmark.resourceId === caisyArticle.id));
  const favoritesList: Favorites = [...bookmarkedCases, ...bookmarkedArticles];

  return {
    areArticlesLoading,
    bookmarkedArticles,
    bookmarkedCases, 
    favoritesList,
    isUseBookmarksLoading, 
    isUseCasesLoading
  };
};

export default useAllFavorites;
