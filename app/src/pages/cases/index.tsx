
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
  const { allCases, allLegalAreaRes, allMainCategories } = props;
  console.log("casess", { props });
  const content = {
    ...props,
    allCases,
    allLegalAreaRes: allLegalAreaRes?.allLegalArea?.edges?.map((edge) => edge?.node),
    allMainCategories
  };
  return (
    <Layout>
      <OverviewPage variant="case" content={content}/>      
    </Layout>
  );
};

export default NextPage;
