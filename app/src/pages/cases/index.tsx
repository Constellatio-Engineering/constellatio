
import { Layout } from "@/components/layouts/Layout";
import OverviewPage from "@/components/pages/OverviewPage/OverviewPage";
import getCasesOverviewProps, { type ICasesOverviewProps } from "@/services/content/getCasesOverviewProps";
import { type IGenCase_ConnectionEdge, IGenGetAllCasesByMainCategoryQuery } from "@/services/graphql/__generated/sdk";
import { caisySDK } from "@/services/graphql/getSdk";

import { type GetStaticProps } from "next";
import { type FunctionComponent, } from "react";

export const getStaticProps: GetStaticProps<Promise<IGenCase_ConnectionEdge[]>> = async (api) => 
{
  const propsApi = api.params;
  const allCasesByMainCategoryRes = await caisySDK.getAllCasesByMainCategory({ mainCategory: "Civil Law" });
  const allMainCategories = await caisySDK.getAllMainCategory();

  return {
    props: {
      allMainCategories: allMainCategories?.allMainCategory?.edges?.map((item) => item?.node),
      allMainCategoryCases: allCasesByMainCategoryRes?.allCase?.edges?.map((item) => item?.node),
      propsApi: propsApi || null
    },
    revalidate: 10,
  };

};

const NextPage: FunctionComponent<ICasesOverviewProps> = (props) => 
{
  console.log({ props });
  
  return (
    <Layout>
      <OverviewPage variant="case" content={props}/>      
    </Layout>
  );
};

export default NextPage;
