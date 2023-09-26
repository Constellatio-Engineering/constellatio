import { AuthPage } from "@/components/pages/AuthPage/AuthPage";
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

const Login: FunctionComponent<ServerSidePropsResult> = () => (
  <AuthPage tab="register"/>
);

export default Login;
