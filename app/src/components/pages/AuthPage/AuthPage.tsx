import { SwitcherTab } from "@/components/atoms/Switcher-tab/SwitcherTab";
import GoogleIcon from "@/components/Icons/Google_G_logo.svg";
import LinkedInIcon from "@/components/Icons/LinkedIn_icon.svg";
import ErrorCard from "@/components/molecules/errorCard/ErrorCard";
import { Switcher } from "@/components/molecules/Switcher/Switcher";
import { Header } from "@/components/organisms/Header/Header";
import { LoginForm } from "@/components/organisms/LoginForm/LoginForm";
import { RegistrationForm, type SignupFormVariant } from "@/components/organisms/RegistrationForm/RegistrationForm";
import { RegistrationVisualHeader } from "@/components/organisms/RegistrationVisualHeader/RegistrationVisualHeader";
import { SocialLoginButton } from "@/components/pages/AuthPage/socialLoginButton/SocialLoginButton";
import { colooors } from "@/constants/styles/colors";
import { env } from "@/env.mjs";
import { supabase } from "@/lib/supabase";
import { type Nullable } from "@/utils/types";

import { Container, Flex, Tabs } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { type Provider } from "@supabase/auth-js";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { type FC, useEffect } from "react";
import { z } from "zod";
import { makeZodI18nMap } from "zod-i18n-map";

import * as styles from "./AuthPage.styles";

type CommonProps = {
  readonly socialAuthError: Nullable<string>;
};

type LoginProps = {
  readonly tab: "login";
};

type RegisterProps = {
  readonly formVariant: SignupFormVariant;
  readonly tab: "register";
};

export type AuthPageProps = CommonProps & (LoginProps | RegisterProps);

export const AuthPage: FC<AuthPageProps> = (props) =>
{
  const { socialAuthError, tab } = props;
  const { t } = useTranslation();
  const router = useRouter();
  const handleTabChange = async (tab: AuthPageProps["tab"]): Promise<boolean> => router.push(`/${tab}`);
  const isPhoneScreen = useMediaQuery("(max-width: 480px)");

  const signInWithSocialLogin = async (provider: Provider) =>
  {
    const { data, error } = await supabase.auth.signInWithOAuth({
      options: {
        redirectTo: `${env.NEXT_PUBLIC_WEBSITE_URL}/api/auth/callback`,
      },
      provider
    });

    if(error)
    {
      console.log(`error while signing in with ${provider}`, error);
      return;
    }

    if(!data.url)
    {
      console.log("no url was returned after signing in with " + provider);
      return;
    }

    await router.push(data.url);
  };

  useEffect(() =>
  {
    z.setErrorMap(makeZodI18nMap({ t }));
  }, [t]);

  return (
    <Flex
      justify="space-between"
      bg="brand-01.5"
      sx={{
        height: "100vh", minHeight: 600, overflow: "hidden", padding: 0 
      }}>
      <RegistrationVisualHeader/>
      <Container
        w="100%"
        pt={20}
        css={styles.wrapper}
        sx={() => ({
          backgroundColor: colooors["neutrals-01"][0],
          marginRight: 0,
          overflowY: "auto",
          paddingTop: "0px !important",
        })}>
        <Header variant="relative"/>
        <Container
          w={isPhoneScreen ? 300 : 440}
          pt={50}
          pb={tab === "register" ? "spacing-100" : 0}
          sx={{ marginTop: "40px" }}>
          <div css={styles.socialButtonsWrapper}>
            {socialAuthError && (
              <ErrorCard error={socialAuthError}/>
            )}
            <SocialLoginButton
              icon={GoogleIcon}
              name={"Google"}
              onClick={async () => signInWithSocialLogin("google")}
            />
            <SocialLoginButton
              icon={LinkedInIcon}
              name={"LinkedIn"}
              onClick={async () => signInWithSocialLogin("linkedin_oidc")}
            />
          </div>
          <div css={styles.separatorWrapper}>
            <span>oder</span>
          </div>
          <Switcher
            size="big"
            value={tab}
            keepMounted={false}
            onTabChange={handleTabChange}
            tabStyleOverwrite={{ width: "49.5%" }}
            panelStyleOverwrite={{ padding: "40px 0" }}>
            <Tabs.List grow>
              <SwitcherTab value="login">Anmelden</SwitcherTab>
              <SwitcherTab style={{ whiteSpace: "nowrap" }} value="register">Konto erstellen</SwitcherTab>
            </Tabs.List>
            <Tabs.Panel value="login">
              <LoginForm/>
            </Tabs.Panel>
            <Tabs.Panel value="register">
              <RegistrationForm formVariant={props.tab === "register" ? props.formVariant : "minimal"}/>
            </Tabs.Panel>
          </Switcher>
        </Container>
      </Container>
    </Flex>
  );
};
