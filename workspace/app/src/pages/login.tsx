import PageHead from "@/components/organisms/pageHead/PageHead";
import { type SignupFormVariant } from "@/components/organisms/RegistrationForm/RegistrationForm";
import { AuthPage } from "@/components/pages/AuthPage/AuthPage";
import { env } from "@/env.mjs";
import { getCommonProps } from "@/utils/commonProps";
import { queryParams } from "@/utils/query-params";

import { getIsUserLoggedInServer } from "@constellatio/api/utils/auth";
import { appPaths } from "@constellatio/shared/paths";
import { type Nullable } from "@constellatio/utility-types";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { type GetServerSideProps } from "next";
import { type SSRConfig } from "next-i18next";
import { type FunctionComponent } from "react";

import { defaultLocale } from "../../next.config.mjs";

export type ServerSidePropsResult = SSRConfig & {
  // False positive, this is used in the Register AuthPage
  // eslint-disable-next-line react/no-unused-prop-types
  readonly formVariant: SignupFormVariant;
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
  const socialAuthErrorQueryParam = ctx.query[queryParams.socialAuthError];
  const formVariant: SignupFormVariant = ctx.query[queryParams.signupFormVariant] === "full" ? "full" : "minimal";

  return {
    props: {
      ...commonProps,
      formVariant,
      socialAuthError: socialAuthErrorQueryParam ? (Array.isArray(socialAuthErrorQueryParam) ? socialAuthErrorQueryParam.join(" ") : socialAuthErrorQueryParam) : null
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
