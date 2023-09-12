
import { Layout } from "@/components/layouts/Layout";
import CasesOverviewPage from "@/components/pages/CasesOverviewPage/CasesOverviewPage";
import getCasesOverviewProps, { type ICasesOverviewProps } from "@/services/content/getCasesOverviewProps";

import { type GetStaticProps } from "next";
import { type FunctionComponent, } from "react";
import React from "react";

export const getStaticProps: GetStaticProps<
Awaited<ReturnType<typeof getCasesOverviewProps>>
> = async () => 
{

  const resAllCases = await getCasesOverviewProps();

  return {
    props: {
      ...(resAllCases || null)
    },
    revalidate: 1,
  };

};

const NextPage: FunctionComponent<ICasesOverviewProps> = (props) => 
{
  
  return (
    <Layout>
      <CasesOverviewPage {...props}/>      
    </Layout>
  );
};

export default NextPage;
