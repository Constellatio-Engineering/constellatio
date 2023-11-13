import PageHead from "@/components/organisms/pageHead/PageHead";
import { AuthPage } from "@/components/pages/AuthPage/AuthPage";
import { getCommonProps } from "@/utils/commonProps";

import { type GetStaticProps } from "next";
import { type SSRConfig } from "next-i18next";
import { type FunctionComponent } from "react";

import { defaultLocale } from "../../next.config.mjs";

type StaticPropsResult = SSRConfig;

export const getStaticProps: GetStaticProps<StaticPropsResult> = async ({ locale = defaultLocale }) =>
{
  const commonProps = await getCommonProps({ locale });

  return {
    props: commonProps,
  };
};

const Login: FunctionComponent<StaticPropsResult> = () => (
  <>
    <PageHead pageTitle="Registrierung"/>
    <AuthPage tab="register"/>
  </>
);

export default Login;
