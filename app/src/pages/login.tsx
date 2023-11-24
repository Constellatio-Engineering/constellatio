import PageHead from "@/components/organisms/pageHead/PageHead";
import { AuthPage } from "@/components/pages/AuthPage/AuthPage";
import { env } from "@/env.mjs";
import { getIsUserLoggedIn } from "@/utils/auth";
import { getCommonProps } from "@/utils/commonProps";
import { paths } from "@/utils/paths";

import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { type GetServerSideProps } from "next";
import { type SSRConfig } from "next-i18next";
import { type FunctionComponent } from "react";

import { defaultLocale } from "../../next.config.mjs";

export type ServerSidePropsResult = SSRConfig;

export const getServerSideProps: GetServerSideProps<ServerSidePropsResult> = async (ctx) =>
{
  console.log("--- login getServerSideProps ---");

  const supabase = createPagesServerClient(ctx, {
    supabaseKey: env.SUPABASE_SERVICE_ROLE_KEY,
    supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL
  });

  const { isUserLoggedIn } = await getIsUserLoggedIn(supabase);

  console.log("isUserLoggedIn", isUserLoggedIn);

  if(isUserLoggedIn)
  {
    console.log("redirecting to dashboard");

    return {
      redirect: {
        destination: paths.dashboard,
        permanent: false,
      }
    };
  }

  console.log("not logged in, rendering login page");

  const commonProps = await getCommonProps({ locale: ctx.locale || defaultLocale });

  return {
    props: commonProps,
  };
};

const Login: FunctionComponent<ServerSidePropsResult> = () => (
  <>
    <PageHead pageTitle="Login"/>
    <AuthPage tab="login"/>
  </>
);

export default Login;
