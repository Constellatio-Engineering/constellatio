import ContentWrapper from "@/components/helpers/contentWrapper/ContentWrapper";
import ForumQuestions from "@/components/pages/forumOverviewPage/forumQuestions/ForumQuestions";
import UseQueryStateWrapper from "@/components/Wrappers/useQueryStateWrapper/UseQueryStateWrapper";
import useArticles from "@/hooks/useArticles";
import useBookmarks from "@/hooks/useBookmarks";
import useCases from "@/hooks/useCases";
import { type NonEmptyArray, type Nullable } from "@/utils/types";

import { Loader } from "@mantine/core";
import { useRouter } from "next/router";
import { parseAsString, useQueryState } from "next-usequerystate";
import React, { type FunctionComponent } from "react";

import * as styles from "./PersonalSpaceFavoriteTab.styles";
import EmptyStateCard from "../emptyStateCard/EmptyStateCard";
import FavoriteArticlesList from "../favoriteArticlesList/FavoriteArticlesList";
import FavoriteCasesList from "../favoriteCasesList/FavoriteCasesList";
import PersonalSpaceNavBar from "../personalSpaceNavBar/PersonalSpaceNavBar";

import { type IGenArticle, type IGenArticleOverviewFragment, type IGenFullCaseFragment, type IGenMainCategory } from "@/services/graphql/__generated/sdk";
import { appPaths } from "@/utils/paths";

export type FavoriteCategoryNavTab = {
  itemsPerTab: number;
  slug: string;
  title: string;
};

const PersonalSpaceFavoriteTabContent: FunctionComponent = () =>
{
  const { allCases = [], isLoading: areCasesLoading } = useCases();
  const { allArticles = [], isLoading: areArticlesLoading } = useArticles(); 
  const { bookmarks, isLoading: areBookmarksLoading, questionsBookmarks } = useBookmarks(undefined);
  const allCasesBookmarks = bookmarks.filter(bookmark => bookmark?.resourceType === "case") ?? [];
  const allArticlesBookmarks = bookmarks.filter(bookmark => bookmark?.resourceType === "article") ?? [];
  const bookmarkedCases = allCases.filter(caisyCase => allCasesBookmarks.some(bookmark => bookmark.resourceId === caisyCase.id));
  const bookmarkedArticles = allArticles.filter((caisyArticle: IGenArticle) => allArticlesBookmarks.some(bookmark => bookmark.resourceId === caisyArticle.id));

  const favoriteCategoryNavTabs: NonEmptyArray<FavoriteCategoryNavTab> = [
    {
      itemsPerTab: bookmarkedCases?.length ?? 0,
      slug: "faelle",
      title: "FÄLLE"
    },
    {
      itemsPerTab: bookmarkedArticles?.length ?? 0,
      slug: "lexikon",
      title: "LEXIKON"
    },
    {
      itemsPerTab: questionsBookmarks.length ?? 0,
      slug: "forum",
      title: "FORUM"
    }
  ];

  const [selectedTabSlug, setSelectedTabSlug] = useQueryState("tab", parseAsString.withDefault(favoriteCategoryNavTabs[0]!.slug));
  const mainCategoriesInBookmarkedCases = bookmarkedCases.map(bookmarkedCase => bookmarkedCase?.mainCategoryField?.[0]);
  const mainCategoriesInBookmarkedArticles = bookmarkedArticles.map(bookmarkedCase => bookmarkedCase?.mainCategoryField?.[0]);
  const bookmarkedCasesMainCategoriesUnique = mainCategoriesInBookmarkedCases.reduce<IGenMainCategory[]>((acc, current) => 
  {
    if(current != null)
    {
      const x = acc.find((item: IGenMainCategory) => item.mainCategory === current.mainCategory);
      if(!x) { return acc.concat([current]); }
    }
    return acc;
  }, []);
  const bookmarkedArticlesMainCategoriesUnique = mainCategoriesInBookmarkedArticles.reduce<IGenMainCategory[]>((acc, current) => 
  {
    if(current != null)
    {
      const x = acc.find((item: IGenMainCategory) => item.mainCategory === current.mainCategory);
      if(!x) { return acc.concat([current]); }
    }
    return acc;
  }, []);
  const casesByMainCategory = (id: Nullable<string>): IGenFullCaseFragment[] | IGenArticleOverviewFragment[] => bookmarkedCases?.filter(bookmarkedCase =>
  {
    return bookmarkedCase.mainCategoryField?.[0]?.id === id;
  });
  const ArticlesByMainCategory = (id: Nullable<string>): IGenArticle[] => bookmarkedArticles?.filter(bookmarkedArticle =>
  {
    return bookmarkedArticle.mainCategoryField?.[0]?.id === id;
  });
  const favoriteCasesListProps = { bookmarkedCasesMainCategoriesUnique, casesByMainCategory };
  const favoriteArticlesListProps = { ArticlesByMainCategory, bookmarkedArticlesMainCategoriesUnique };
  const router = useRouter();
  return (
    <div>
      <PersonalSpaceNavBar
        setSelectedTabSlug={setSelectedTabSlug}
        selectedTabSlug={selectedTabSlug}
        tabs={favoriteCategoryNavTabs}
      />
      <ContentWrapper>
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          {(selectedTabSlug === favoriteCategoryNavTabs[0]!.slug) && (
            <> 
              {(areBookmarksLoading || areCasesLoading) ? (
                <Loader sx={{ margin: "50px" }}/>
              ) : (
                bookmarkedCases?.length > 0 ? (
                  <FavoriteCasesList {...favoriteCasesListProps}/>
                ) : (
                  <EmptyStateCard
                    button={{
                      content: "Alle Fälle ansehen",
                      onClick: async () => router.push(appPaths.cases)
                    }}
                    title="Du hast noch keine Fälle als Favoriten gespeichert"
                    text="Du kannst Fälle, Lexikon-Artikel und sogar einzelne markierte Textpassagen als deine persönlichen Favoriten speichern"
                    variant="For-large-areas"
                  />
                )
              )}
            </>
          )}
          {selectedTabSlug === favoriteCategoryNavTabs[1]!.slug && (
            <>
              {
                (areBookmarksLoading || areArticlesLoading) ? (
                  <Loader sx={{ margin: "50px" }}/>
                ) :  
                  bookmarkedArticles?.length > 0 ? (
                    <FavoriteArticlesList {...favoriteArticlesListProps}/>
                  ) : ( 
                    <EmptyStateCard
                      button={{
                        content: "Alle Lexikon-Artikel ansehen",
                        onClick: async () => router.push(appPaths.dictionary)
                      }}
                      title="Du hast noch keine Lexikon-Artikel als Favoriten gespeichert"
                      text="Du kannst Fälle, Lexikon-Artikel und sogar einzelne markierte Textpassagen als deine persönlichen Favoriten speichern"
                      variant="For-large-areas"
                    />
                  )
              }
            </>
          )}
          {selectedTabSlug === favoriteCategoryNavTabs[2]!.slug && (
            <>
              {areBookmarksLoading ? (
                <Loader sx={{ margin: "50px auto" }}/>
              ) : (
                <div css={styles.questionsWrapper}>
                  <ForumQuestions questionIds={questionsBookmarks.map(b => b.resourceId)}/>
                </div>
              )}
            </>
          )}
        </div>
      </ContentWrapper>
    </div>
  );
};

const PersonalSpaceFavoriteTab: FunctionComponent = () =>
{
  return (
    <UseQueryStateWrapper>
      <PersonalSpaceFavoriteTabContent/>
    </UseQueryStateWrapper>
  );
};

export default PersonalSpaceFavoriteTab;
