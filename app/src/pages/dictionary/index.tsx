import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/organisms/pageHead/PageHead";
import OverviewPage from "@/components/pages/OverviewPage/OverviewPage";
import { type NextPageWithLayout } from "@/pages/_app";
import getAllArticles from "@/services/content/getAllArticles";
import { getOverviewPageProps, type GetOverviewPagePropsResult } from "@/services/content/getOverviewPageProps";
import { useArticlesOverviewFiltersStore } from "@/stores/overviewFilters.store";
import { type ArticleWithNextAndPreviousArticleId, getArticlesWithNextAndPreviousArticleId } from "@/utils/articles";

import { type GetStaticProps } from "next";
import { useStore } from "zustand";

export type GetArticlesOverviewPagePropsResult = GetOverviewPagePropsResult & {
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

const NextPage: NextPageWithLayout<GetArticlesOverviewPagePropsResult> = (articlesOverviewProps) =>
{
  const filters = useStore(useArticlesOverviewFiltersStore, s => s.filters);
  const toggleFilter = useStore(useArticlesOverviewFiltersStore, s => s.toggleFilter);
  const openDrawer = useStore(useArticlesOverviewFiltersStore, s => s.openDrawer);
  const clearAllFilters = useStore(useArticlesOverviewFiltersStore, s => s.clearAllFilters);
  const totalFiltersCount = useStore(useArticlesOverviewFiltersStore, s => s.getTotalFiltersCount());

  return (
    <>
      <PageHead pageTitle="Lexikon"/>
      <OverviewPage
        {...articlesOverviewProps}
        variant={"dictionary"}
        filter={{
          clearAllFilters,
          filters,
          openDrawer,
          toggleFilter,
          totalFiltersCount
        }}
      />
    </>
  );
};

NextPage.getLayout = Layout;

export default NextPage;
