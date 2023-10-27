import { Layout } from "@/components/layouts/Layout";
import OverviewPage from "@/components/pages/OverviewPage/OverviewPage";
import getArticlesOverviewProps, { type IArticlesOverviewProps } from "@/services/content/getArticlesOverviewProps";

import { type GetStaticProps } from "next";
import { type FunctionComponent, } from "react";

type GetArticlesOverviewPagePropsResult = IArticlesOverviewProps;

export const getStaticProps: GetStaticProps<GetArticlesOverviewPagePropsResult> = async () =>
{
  const allArticles = await getArticlesOverviewProps();

  return {
    props: allArticles,
    revalidate: 10,
  };

};

const NextPage: FunctionComponent<GetArticlesOverviewPagePropsResult> = (articlesOverviewProps) => (
  <Layout>
    <OverviewPage content={articlesOverviewProps} variant="dictionary"/>
  </Layout>
);

export default NextPage;
