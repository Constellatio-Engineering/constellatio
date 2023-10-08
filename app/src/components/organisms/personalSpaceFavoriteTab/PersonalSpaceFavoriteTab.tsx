import FavoriteArticlesList from "@/components/favoriteArticlesList/FavoriteArticlesList";
import useArticles from "@/hooks/useArticles";
import useBookmarks from "@/hooks/useBookmarks";
import useCases from "@/hooks/useCases";
import { type IGenMainCategory, type IGenFullCaseFragment, type IGenArticleOverviewFragment, type IGenArticle } from "@/services/graphql/__generated/sdk";
import { type Nullable } from "@/utils/types";

import { Loader } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useId, type FunctionComponent, useState } from "react";

import * as styles from "./PersonalSpaceFavoriteTab.styles";
import EmptyStateCard from "../emptyStateCard/EmptyStateCard";
import FavoriteCasesList from "../favoriteCasesList/FavoriteCasesList";
import { slugFormatter } from "../OverviewHeader/OverviewHeader";
import PersonalSpaceNavBar from "../personalSpaceNavBar/PersonalSpaceNavBar";

const PersonalSpaceFavoriteTab: FunctionComponent = () => 
{
  const FavCasesTabId = useId();
  const FavDictionaryTabId = useId();
  // const FavForumsTabId = useId();
  // const FavHighlightsTabId = useId();
  const { allCases = [], isLoading: areCasesLoading } = useCases();
  const { allArticles = [], isLoading: areArticlesLoading } = useArticles(); 
  const { bookmarks, isLoading: areBookmarksLoading } = useBookmarks(undefined);
  const allCasesBookmarks = bookmarks.filter(bookmark => bookmark?.resourceType === "case") ?? [];
  const allArticlesBookmarks = bookmarks.filter(bookmark => bookmark?.resourceType === "article") ?? [];
  const bookmarkedCases = allCases.filter(caisyCase => allCasesBookmarks.some(bookmark => bookmark.resourceId === caisyCase.id));
  const bookmarkedArticles = allArticles.filter((caisyArticle: IGenArticle) => allArticlesBookmarks.some(bookmark => bookmark.resourceId === caisyArticle.id));
 
  const favoriteCategoryNavTabs = [{ id: FavCasesTabId, itemsPerTab: bookmarkedCases?.length ?? 0, title: "CASES" }, { id: FavDictionaryTabId, itemsPerTab: bookmarkedArticles?.length ?? 0, title: "DICTIONARY" }];
  const [selectedTabId, setSelectedTabId] = useState<string>(favoriteCategoryNavTabs?.[0]?.id as string);
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
  React.useEffect(() => 
  {
    if(router.query.tab)
    {
      setSelectedTabId(favoriteCategoryNavTabs.filter((x) => slugFormatter(x.title) === router.query.tab)[0]?.id as string);
    }
  // Adding selectedTabId to the dependency array will cause an infinite loop
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.tab]);
  return (
    <div css={styles.wrapper}>
      <PersonalSpaceNavBar setSelectedTabId={setSelectedTabId} selectedTabId={selectedTabId} tabs={favoriteCategoryNavTabs}/>
      {(selectedTabId === FavCasesTabId) ? (
        <> 
          {(areBookmarksLoading || areCasesLoading) ? (
            <Loader sx={{ margin: "50px" }}/>
          ) : (
            bookmarkedCases?.length > 0 ? (
              <>  
                <FavoriteCasesList {...favoriteCasesListProps}/>
              </>
            ) : (
              <EmptyStateCard
                button={<Link href="/cases">Explore Cases</Link>}
                title="You haven’t saved any cases yet"
                text="You can save cases, dictionary articles, forum questions and highlighted text to Favourites"
                variant="For-large-areas"
              />
            )
          )}
        
        </>
      ) : selectedTabId === FavDictionaryTabId && (
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
