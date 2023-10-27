import { Layout } from "@/components/layouts/Layout";
import OverviewPage from "@/components/pages/OverviewPage/OverviewPage";
import getCasesOverviewProps, { type ICasesOverviewProps } from "@/services/content/getCasesOverviewProps";

import { type GetStaticProps } from "next";
import { type FunctionComponent } from "react";

type GetCasesOverviewPagePropsResult = ICasesOverviewProps;

export const getStaticProps: GetStaticProps<GetCasesOverviewPagePropsResult> = async () =>
{
  const casesOverviewProps = await getCasesOverviewProps();

  return {
    props: casesOverviewProps,
    revalidate: 10,
  };
};

const NextPage: FunctionComponent<GetCasesOverviewPagePropsResult> = (casesOverviewProps) => (
  <Layout>
    <OverviewPage variant="case" content={casesOverviewProps}/>
  </Layout>
);

export default NextPage;
