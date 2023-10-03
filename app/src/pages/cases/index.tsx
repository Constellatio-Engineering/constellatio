
import { Layout } from "@/components/layouts/Layout";
import OverviewPage from "@/components/pages/OverviewPage/OverviewPage";
import getCasesOverviewProps, { type ICasesOverviewProps } from "@/services/content/getCasesOverviewProps";

import { type GetStaticProps } from "next";
import { type FunctionComponent } from "react";

export const getStaticProps: GetStaticProps<
Awaited<ReturnType<typeof getCasesOverviewProps>>
> = async () => 
{

  const resAllCases = await getCasesOverviewProps();

  return {
    props: {
      ...(resAllCases || null),
    },
    revalidate: 10,
  };

};

const NextPage: FunctionComponent<ICasesOverviewProps> = (props) => 
{
  const { allCases, allLegalAreaRes, allMainCategoriesRes } = props;
  console.log({ props });
  const content = {
    __typename: "case",
    allCases,
    allLegalAreaRes: allLegalAreaRes?.allLegalArea?.edges?.map((edge) => edge?.node),
    allMainCategories: allMainCategoriesRes?.allMainCategory?.edges?.map((edge) => edge?.node),
  };
  return (
    <Layout>
      <OverviewPage variant="case" content={content}/>      
    </Layout>
  );
};

export default NextPage;
