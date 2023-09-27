import { Layout } from "@/components/layouts/Layout";
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
    <Layout>
      hi this is dashboard
    </Layout>
  );
};

export default Dashboard;
