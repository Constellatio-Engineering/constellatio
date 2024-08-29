import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/organisms/pageHead/PageHead";
import OverviewPage from "@/components/pages/OverviewPage/OverviewPage";
import { type NextPageWithLayout } from "@/pages/_app";
import { getOverviewPageProps, type GetOverviewPagePropsResult } from "@/services/content/getOverviewPageProps";

import { type GetStaticProps } from "next";

type GetArticlesOverviewPagePropsResult = GetOverviewPagePropsResult;

export const getStaticProps: GetStaticProps<GetArticlesOverviewPagePropsResult> = async () =>
{
  const articlesOverviewProps = await getOverviewPageProps("dictionary");

  return {
    props: articlesOverviewProps,
    revalidate: 10,
  };
};

const NextPage: NextPageWithLayout<GetArticlesOverviewPagePropsResult> = (articlesOverviewProps) => (
  <>
    <PageHead pageTitle="Lexikon"/>
    <OverviewPage {...articlesOverviewProps}/>
  </>
);

NextPage.getLayout = Layout;

export default NextPage;
