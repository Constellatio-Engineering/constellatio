import { SwitcherTab } from "@/components/atoms/Switcher-tab/SwitcherTab";
import { Switcher } from "@/components/molecules/Switcher/Switcher";
import { Header } from "@/components/organisms/Header/Header";
import { LoginForm } from "@/components/organisms/LoginForm/LoginForm";
import { RegistrationForm } from "@/components/organisms/RegistrationForm/RegistrationForm";
import { RegistrationVisualHeader } from "@/components/organisms/RegistrationVisualHeader/RegistrationVisualHeader";

import { Container, Flex, Tabs } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { type FC, useEffect } from "react";
import z from "zod";
import { makeZodI18nMap } from "zod-i18n-map";

import * as styles from "./AuthPage.styles";

export interface AuthPageProps
{
  readonly tab: "login" | "register";
}

export const AuthPage: FC<AuthPageProps> = ({ tab }) =>
{
  const { t } = useTranslation();
  const router = useRouter();
  const handleTabChange = async (tab: AuthPageProps["tab"]): Promise<boolean> => router.push(`/${tab}`);
  const isPhoneScreen = useMediaQuery("(max-width: 480px)");

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
        sx={(theme) => ({
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
          sx={{ marginTop: "80px" }}>
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
              <RegistrationForm/>
            </Tabs.Panel>
          </Switcher>
        </Container>
      </Container>
    </Flex>
  );
};
