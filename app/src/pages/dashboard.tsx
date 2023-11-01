import { Layout } from "@/components/layouts/Layout";
import PageHead from "@/components/organisms/pageHead/PageHead";
import DashboardPage from "@/components/pages/dashboardPage/DashboardPage";
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
    props: commonProps,
  };
};

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
