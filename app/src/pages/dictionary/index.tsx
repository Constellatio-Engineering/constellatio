import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/organisms/pageHead/PageHead";
import OverviewPage from "@/components/pages/OverviewPage/OverviewPage";
import { type NextPageWithLayout } from "@/pages/_app";
import getArticlesOverviewProps, { type IArticlesOverviewProps } from "@/services/content/getArticlesOverviewProps";

import { type GetStaticProps } from "next";

type GetArticlesOverviewPagePropsResult = IArticlesOverviewProps;

export const getStaticProps: GetStaticProps<GetArticlesOverviewPagePropsResult> = async () =>
{
  const allArticles = await getArticlesOverviewProps();

  return {
    props: allArticles,
    revalidate: 10,
  };

};

const NextPage: NextPageWithLayout<GetArticlesOverviewPagePropsResult> = (articlesOverviewProps) => (
  <>
    <PageHead pageTitle="Lexikon"/>
    <OverviewPage content={articlesOverviewProps} variant="dictionary"/>
  </>
);

NextPage.getLayout = Layout;

export default NextPage;
