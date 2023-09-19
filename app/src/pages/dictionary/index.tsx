
import { Layout } from "@/components/layouts/Layout";
import OverviewPage from "@/components/pages/OverviewPage/OverviewPage";
import getArticlesOverviewProps, { type IArticlesOverviewProps } from "@/services/content/getArticlesOverviewProps";

import { type GetStaticProps } from "next";
import { type FunctionComponent, } from "react";

export const getStaticProps: GetStaticProps<
Awaited<ReturnType<typeof getArticlesOverviewProps>>
> = async () => 
{

  const allArticles = await getArticlesOverviewProps();

  return {
    props: {
      ...(allArticles || null)
    },
    revalidate: 1,
  };

};

const NextPage: FunctionComponent<IArticlesOverviewProps> = (props) => 
{
  return (
    <Layout>
      <OverviewPage content={props} variant="dictionary"/>      
    </Layout>
  );
};

export default NextPage;
