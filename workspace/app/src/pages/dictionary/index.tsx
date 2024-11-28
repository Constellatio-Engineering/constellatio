import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/organisms/pageHead/PageHead";
import OverviewPage from "@/components/pages/OverviewPage/OverviewPage";
import { type NextPageWithLayout } from "@/pages/_app";
import { useArticlesOverviewFiltersStore, type WasSeenFilterOption, wasSeenFilterOptions } from "@/stores/overviewFilters.store";
import { api } from "@/utils/api";

import { type AppRouter } from "@constellatio/api";
import { getAllArticles } from "@constellatio/cms/content/getAllArticles";
import { getOverviewPageProps, type GetOverviewPagePropsResult } from "@constellatio/cms/content/getOverviewPageProps";
import { type ArticleWithNextAndPreviousArticleId, getArticlesWithNextAndPreviousArticleId } from "@constellatio/cms/utils/articles";
import { type inferProcedureOutput } from "@trpc/server";
import { type GetStaticProps } from "next";
import { useMemo } from "react";
import { useStore } from "zustand";

type GetArticlesOverviewPagePropsResult = GetOverviewPagePropsResult & {
  items: ArticleWithNextAndPreviousArticleId[];
  variant: "dictionary";
};

export const getStaticProps: GetStaticProps<GetArticlesOverviewPagePropsResult> = async () =>
{
  const allArticles = await getAllArticles();
  const articlesWithNextAndPreviousArticleId = getArticlesWithNextAndPreviousArticleId(allArticles);
  const overviewPageProps = await getOverviewPageProps(articlesWithNextAndPreviousArticleId);

  return {
    props: {
      ...overviewPageProps,
      items: articlesWithNextAndPreviousArticleId,
      variant: "dictionary"
    },
    revalidate: 10,
  };
};

const getArticlesWithSeenStatus = (articles: GetArticlesOverviewPagePropsResult["items"], seenArticles?: inferProcedureOutput<AppRouter["views"]["getAllSeenArticles"]>) =>
{
  return articles.map(article =>
  {
    const wasSeen = seenArticles?.some(articleId => articleId === article.id) ?? false;

    let wasSeenFilterable: WasSeenFilterOption;

    switch (wasSeen)
    {
      case true:
      {
        wasSeenFilterable = wasSeenFilterOptions.find(option => option.value === "seen")!;
        break;
      }
      case false:
      {
        wasSeenFilterable = wasSeenFilterOptions.find(option => option.value === "not-seen")!;
        break;
      }
    }

    return ({
      ...article,
      wasSeen,
      wasSeenFilterable
    });
  });
};

export type ArticlesWithSeenStatus = ReturnType<typeof getArticlesWithSeenStatus>;
export type ArticleOverviewPageProps = Omit<GetArticlesOverviewPagePropsResult, "items"> & {
  items: ArticlesWithSeenStatus;
};
export type ArticleOverviewPageItems = ArticleOverviewPageProps["items"][number];

const NextPage: NextPageWithLayout<GetArticlesOverviewPagePropsResult> = ({
  items,
  ...props
}) =>
{
  const { data: seenArticles } = api.views.getAllSeenArticles.useQuery(undefined);
  const articlesWithSeenStatus = useMemo(() => getArticlesWithSeenStatus(items, seenArticles), [items, seenArticles]);
  const filters = useStore(useArticlesOverviewFiltersStore, s => s.filters);
  const openDrawer = useStore(useArticlesOverviewFiltersStore, s => s.openDrawer);
  const clearAllFilters = useStore(useArticlesOverviewFiltersStore, s => s.clearAllFilters);
  const totalFiltersCount = useStore(useArticlesOverviewFiltersStore, s => s.getTotalFiltersCount());

  return (
    <>
      <PageHead pageTitle="Lexikon"/>
      <OverviewPage
        {...props}
        items={articlesWithSeenStatus}
        variant={"dictionary"}
        filter={{
          clearAllFilters,
          filters,
          openDrawer,
          totalFiltersCount
        }}
      />
    </>
  );
};

NextPage.getLayout = Layout;

export default NextPage;
