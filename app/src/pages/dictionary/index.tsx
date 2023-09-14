
import { Layout } from "@/components/layouts/Layout";
import CasesOverviewPage from "@/components/pages/CasesOverviewPage/CasesOverviewPage";
import getArticlesOverviewProps, { type IArticlesOverviewProps } from "@/services/content/getArticlesOverviewProps";

import { type GetStaticProps } from "next";
import { type FunctionComponent, } from "react";

export const getStaticProps: GetStaticProps<
Awaited<ReturnType<typeof getArticlesOverviewProps>>
> = async () => 
{

  const resAllCases = await getArticlesOverviewProps();

  return {
    props: {
      ...(resAllCases || null)
    },
    revalidate: 1,
  };

};

const NextPage: FunctionComponent<IArticlesOverviewProps> = (props) => 
{
  return (
    <Layout>
      <CasesOverviewPage {...props} allCases={props?.allArticles} variant="dictionary"/>      
    </Layout>
  );
};

export default NextPage;
