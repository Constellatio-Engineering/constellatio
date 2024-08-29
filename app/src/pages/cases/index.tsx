import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/organisms/pageHead/PageHead";
import OverviewPage from "@/components/pages/OverviewPage/OverviewPage";
import { type NextPageWithLayout } from "@/pages/_app";
import { getOverviewPageProps, type GetOverviewPagePropsResult } from "@/services/content/getOverviewPageProps";

import { type GetStaticProps } from "next";

type GetCasesOverviewPagePropsResult = GetOverviewPagePropsResult;

export const getStaticProps: GetStaticProps<GetCasesOverviewPagePropsResult> = async () =>
{
  const casesOverviewProps = await getOverviewPageProps("case");

  return {
    props: casesOverviewProps,
    revalidate: 10,
  };
};

const Page: NextPageWithLayout<GetCasesOverviewPagePropsResult> = (props) => (
  <>
    <PageHead pageTitle="Fälle"/>
    <OverviewPage {...props}/>
  </>
);

Page.getLayout = Layout;

export default Page;
