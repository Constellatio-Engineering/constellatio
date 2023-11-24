import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/organisms/pageHead/PageHead";
import OverviewPage from "@/components/pages/OverviewPage/OverviewPage";
import { type NextPageWithLayout } from "@/pages/_app";
import getCasesOverviewProps, { type ICasesOverviewProps } from "@/services/content/getCasesOverviewProps";

import { type GetStaticProps } from "next";

type GetCasesOverviewPagePropsResult = ICasesOverviewProps;

export const getStaticProps: GetStaticProps<GetCasesOverviewPagePropsResult> = async () =>
{
  const casesOverviewProps = await getCasesOverviewProps();

  return {
    props: casesOverviewProps,
    revalidate: 10,
  };
};

const Page: NextPageWithLayout<GetCasesOverviewPagePropsResult> = (casesOverviewProps) => (
  <>
    <PageHead pageTitle="Fälle"/>
    <OverviewPage variant="case" content={casesOverviewProps}/>
  </>
);

Page.getLayout = Layout;

export default Page;
