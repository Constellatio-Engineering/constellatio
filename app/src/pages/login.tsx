import PageHead from "@/components/organisms/pageHead/PageHead";
import { AuthPage } from "@/components/pages/AuthPage/AuthPage";
import { env } from "@/env.mjs";
import { getIsUserLoggedInServer } from "@/utils/auth";
import { getCommonProps } from "@/utils/commonProps";
import { appPaths } from "@/utils/paths";
import { queryParams } from "@/utils/query-params";
import { type Nullable } from "@/utils/types";

import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { type GetServerSideProps } from "next";
import { type SSRConfig } from "next-i18next";
import { type FunctionComponent } from "react";

import { defaultLocale } from "../../next.config.mjs";

export type ServerSidePropsResult = SSRConfig & {
  readonly socialAuthError: Nullable<string>;
};

export const getServerSideProps: GetServerSideProps<ServerSidePropsResult> = async (ctx) =>
{
  const supabase = createPagesServerClient(ctx, {
    supabaseKey: env.SUPABASE_SERVICE_ROLE_KEY,
    supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL
  });

  const { isUserLoggedIn } = await getIsUserLoggedInServer(supabase);

  if(isUserLoggedIn)
  {
    return {
      redirect: {
        destination: appPaths.dashboard,
        permanent: false,
      }
    };
  }

  const commonProps = await getCommonProps({ locale: ctx.locale || defaultLocale });
  const socialAuthError = ctx.query?.[queryParams.socialAuthError];

  return {
    props: {
      ...commonProps,
      socialAuthError: socialAuthError ? (Array.isArray(socialAuthError) ? socialAuthError.join(" ") : socialAuthError) : null,
    },
  };
};

const Login: FunctionComponent<ServerSidePropsResult> = ({ socialAuthError }) => (
  <>
    <PageHead pageTitle="Login"/>
    <AuthPage tab="login" socialAuthError={socialAuthError}/>
  </>
);

export default Login;
