import FavoriteArticlesList from "@/components/favoriteArticlesList/FavoriteArticlesList";
import useArticles from "@/hooks/useArticles";
import useBookmarks from "@/hooks/useBookmarks";
import useCases from "@/hooks/useCases";
import { type IGenMainCategory, type IGenFullCaseFragment, type IGenArticleOverviewFragment, type IGenArticle } from "@/services/graphql/__generated/sdk";
import { paths } from "@/utils/paths";
import { type NonEmptyArray, type Nullable } from "@/utils/types";

import { Loader } from "@mantine/core";
import Link from "next/link";
import { parseAsString, useQueryState } from "next-usequerystate";
import React, { type FunctionComponent } from "react";

import * as styles from "./PersonalSpaceFavoriteTab.styles";
import EmptyStateCard from "../emptyStateCard/EmptyStateCard";
import FavoriteCasesList from "../favoriteCasesList/FavoriteCasesList";
import PersonalSpaceNavBar from "../personalSpaceNavBar/PersonalSpaceNavBar";

export type FavoriteCategoryNavTab = {
  itemsPerTab: number;
  slug: string;
  title: string;
};

const PersonalSpaceFavoriteTab: FunctionComponent = () => 
{
  const { allCases = [], isLoading: areCasesLoading } = useCases();
  const { allArticles = [], isLoading: areArticlesLoading } = useArticles(); 
  const { bookmarks, isLoading: areBookmarksLoading } = useBookmarks(undefined);
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

  return (
    <div css={styles.wrapper}>
      <PersonalSpaceNavBar
        setSelectedTabSlug={setSelectedTabSlug}
        selectedTabSlug={selectedTabSlug}
        tabs={favoriteCategoryNavTabs}
      />
      {(selectedTabSlug === favoriteCategoryNavTabs[0]!.slug) ? (
        <> 
          {(areBookmarksLoading || areCasesLoading) ? (
            <Loader sx={{ margin: "50px" }}/>
          ) : (
            bookmarkedCases?.length > 0 ? (
              <FavoriteCasesList {...favoriteCasesListProps}/>
            ) : (
              <EmptyStateCard
                button={<Link href={paths.cases}>Explore Cases</Link>}
                title="You haven’t saved any cases yet"
                text="You can save cases, dictionary articles, forum questions and highlighted text to Favourites"
                variant="For-large-areas"
              />
            )
          )}
        </>
      ) : selectedTabSlug === favoriteCategoryNavTabs[1]!.slug && (
        <>
          {
            (areBookmarksLoading || areArticlesLoading) ? (
              <Loader sx={{ margin: "50px" }}/>
            ) :  
              bookmarkedArticles?.length > 0 ? (
                <FavoriteArticlesList {...favoriteArticlesListProps}/>
              ) : ( 
                <EmptyStateCard
                  button={<Link href="/dictionary">Explore Articles</Link>}
                  title="You haven’t saved any Articles yet"
                  text="You can save cases, dictionary articles, forum questions and highlighted text to Favourites"
                  variant="For-large-areas"
                />
              )
          }
        
        </>
      )}
    </div>
  );
};

export default PersonalSpaceFavoriteTab;
