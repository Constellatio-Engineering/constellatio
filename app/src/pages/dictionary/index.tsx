
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
    revalidate: 10,
  };

};

const NextPage: FunctionComponent<IArticlesOverviewProps> = (props) => 
{
  const { allArticles, allLegalAreaRes, allMainCategories } = props;
  console.log("article", { props });

  const content = {
    ...props,
    allArticles,
    allLegalAreaRes: allLegalAreaRes?.allLegalArea?.edges?.map((edge) => edge?.node),
    allMainCategories,
  };

  return (
    <Layout>
      <OverviewPage content={content} variant="dictionary"/>      
    </Layout>
  );
};

export default NextPage;
