import DashboardPage from "@/components/dashboardPage/DashboardPage";
import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/pageHead/PageHead";
import { getCommonProps } from "@/utils/commonProps";

import { type GetServerSideProps } from "next";
import { type SSRConfig } from "next-i18next";
import { type FunctionComponent } from "react";

import { defaultLocale } from "../../next.config.mjs";

type ServerSidePropsResult = SSRConfig;

export const getServerSideProps: GetServerSideProps<ServerSidePropsResult> = async ({ locale = defaultLocale }) =>
{
  const commonProps = await getCommonProps({ locale });

  return {
    props: {
      ...commonProps,
      test: "test",
    },
  };
};

// type SearchResults = {
//   cases: CaseSearchIndexItem[];
//   userUploads: UploadSearchIndexItem[];
// };

// const initialSearchResults: SearchResults = {
//   cases: [],
//   userUploads: [],
// };

const Dashboard: FunctionComponent<ServerSidePropsResult> = () =>
{
  return (
    <>
      <PageHead pageTitle="Dashboard"/>
      <Layout>
        <DashboardPage/>
      </Layout>
    </>
  );
};

export default Dashboard;
