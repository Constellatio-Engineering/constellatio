import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/organisms/pageHead/PageHead";
import OverviewPage from "@/components/pages/OverviewPage/OverviewPage";
import { type NextPageWithLayout } from "@/pages/_app";
import getAllArticles from "@/services/content/getAllArticles";
import { getOverviewPageProps, type GetOverviewPagePropsResult } from "@/services/content/getOverviewPageProps";
import { useArticlesOverviewFiltersStore } from "@/stores/overviewFilters.store";
import { type ArticleWithNextAndPreviousArticleId, getArticlesWithNextAndPreviousArticleId } from "@/utils/articles";

import { type GetStaticProps } from "next";

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
  const filteredLegalAreas = useArticlesOverviewFiltersStore(s => s.filteredLegalAreas);
  const filteredTags = useArticlesOverviewFiltersStore(s => s.filteredTags);
  const filteredTopics = useArticlesOverviewFiltersStore(s => s.filteredTopics);
  const openDrawer = useArticlesOverviewFiltersStore(s => s.openDrawer);

  return (
    <>
      <PageHead pageTitle="Lexikon"/>
      <OverviewPage
        {...articlesOverviewProps}
        variant={"dictionary"}
        filter={{
          filteredLegalAreas,
          filteredTags,
          filteredTopics,
          openDrawer
        }}
      />
    </>
  );
};

NextPage.getLayout = Layout;

export default NextPage;
