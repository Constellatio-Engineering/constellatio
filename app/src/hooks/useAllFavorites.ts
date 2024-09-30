import { type Question } from "@/server/api/routers/forum.router";
import { type IGenArticle, type IGenCase } from "@/services/graphql/__generated/sdk";
import { api } from "@/utils/api";
import { type NullableProperties } from "@/utils/types";

import useArticles from "./useArticles";
import useBookmarks from "./useBookmarks";
import useCases from "./useCases";

export type Favorite = {
  createdAt: Date | string;
  favoriteType: "case" | "article" | "question";
  resourceId: string;
  title: string;
};

type FavoriteNullable = Omit<NullableProperties<Favorite>, "favoriteType"> & {
  favoriteType: Favorite["favoriteType"];
};
export type Favorites = Favorite[];
export type FavoritesNullable = FavoriteNullable[];

type UseAllFavorites = { 
  areArticlesLoading: boolean;
  areQuestionsLoading: boolean;
  bookmarkedArticles: IGenArticle[];
  bookmarkedCases: IGenCase[];
  bookmarkedQuestions: Question[];
  favoritesList: FavoritesNullable;
  isLoading: boolean;
  isUseBookmarksLoading: boolean;
  isUseCasesLoading: boolean;
};

const useAllFavorites = (): UseAllFavorites => 
{
  const { bookmarks, isLoading: isUseBookmarksLoading, questionsBookmarks, } = useBookmarks(undefined);
  const allCasesBookmarks = bookmarks.filter(bookmark => bookmark?.resourceType === "case") ?? [];
  const { allCases = [], isLoading: isUseCasesLoading, } = useCases();
  const bookmarkedCases = allCases.filter(caisyCase => allCasesBookmarks.some(bookmark => bookmark.resourceId === caisyCase.id));
  const { allArticles = [], isLoading: areArticlesLoading } = useArticles(); 
  const allArticlesBookmarks = bookmarks.filter(bookmark => bookmark?.resourceType === "article") ?? [];
  const bookmarkedArticles = allArticles.filter((caisyArticle: IGenArticle) => allArticlesBookmarks.some(bookmark => bookmark.resourceId === caisyArticle.id));
  const { data: questionsQuery, isLoading: areQuestionsLoading } = api.forum.getQuestions.useQuery({
    cursor: {
      cursorType: "newest",
      index: null
    },
    limit: 6,
    questionIds: questionsBookmarks.map(bookmark => bookmark.resourceId)
  }, {
    refetchOnMount: "always",
    staleTime: Infinity
  });

  const questions = questionsQuery?.questions ?? [];

  const favoriteCases: FavoritesNullable = bookmarkedCases
    .filter(legalCase => legalCase._meta?.createdAt != null && legalCase.title != null && legalCase.id != null)
    .map(legalCase => ({
      createdAt: legalCase._meta?.createdAt,
      favoriteType: "case",
      resourceId: legalCase.id,
      title: legalCase.title
    }));

  const favoriteArticles: FavoritesNullable = bookmarkedArticles
    .map(article => ({
      createdAt: article._meta?.createdAt,
      favoriteType: "article",
      resourceId: article.id,
      title: article.title
    }));

  const favoriteQuestions: Favorites = questions
    .map(question => ({
      createdAt: question.createdAt,
      favoriteType: "question",
      resourceId: question.id,
      title: question.title
    }));

  return {
    areArticlesLoading,
    areQuestionsLoading,
    bookmarkedArticles,
    bookmarkedCases,
    bookmarkedQuestions: questions,
    favoritesList: [
      ...favoriteCases,
      ...favoriteArticles,
      ...favoriteQuestions
    ],
    isLoading: areArticlesLoading || areQuestionsLoading || isUseBookmarksLoading || isUseCasesLoading,
    isUseBookmarksLoading, 
    isUseCasesLoading
  };
};

export default useAllFavorites;
