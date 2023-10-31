import { SwitcherTab } from "@/components/atoms/Switcher-tab/SwitcherTab";
import { Switcher } from "@/components/molecules/Switcher/Switcher";
import { Header } from "@/components/organisms/Header/Header";
import { LoginForm } from "@/components/organisms/LoginForm/LoginForm";
import { RegistrationForm } from "@/components/organisms/RegistrationForm/RegistrationForm";
import { RegistrationVisualHeader } from "@/components/organisms/RegistrationVisualHeader/RegistrationVisualHeader";
import { AuthStateContext } from "@/provider/AuthStateProvider";
import { paths } from "@/utils/paths";

import { Container, Flex, Tabs } from "@mantine/core";
import Router, { useRouter } from "next/router";
import { useContext, type FC, useEffect, useRef } from "react";

import * as styles from "./AuthPage.styles";

export interface AuthPageProps
{
  readonly tab: "login" | "register";
}

export const AuthPage: FC<AuthPageProps> = ({ tab }) =>
{
  const router = useRouter();
  const handleTabChange = async (tab: AuthPageProps["tab"]): Promise<boolean> => router.push(`/${tab}`);
  const { isUserLoggedIn } = useContext(AuthStateContext);
  const hasRedirectStarted = useRef<boolean>(false);

  useEffect(() =>
  {
    if(isUserLoggedIn && !hasRedirectStarted.current)
    {
      hasRedirectStarted.current = true;
      void Router.push(paths.dashboard);
    }
  }, [isUserLoggedIn]);

  return (
    <Flex
      justify="space-between"
      bg="brand-01.5"
      sx={{ height: "100vh", minHeight: 600, overflow: "hidden" }}>
      <RegistrationVisualHeader/>
      <Container
        w="100%"
        pt={20}
        css={styles.wrapper}
        sx={(theme) => ({
          backgroundColor: theme.colors["neutrals-01"][0],
          marginRight: 0,
          overflowY: "auto",
          paddingTop: "0px !important",
        })}>
        <Header variant="relative"/>
        <Container
          w={440}
          pt={50}
          pb={tab === "register" ? "spacing-100" : 0}
          sx={{ marginTop: "80px" }}>
          <Switcher
            size="big"
            value={tab}
            onTabChange={handleTabChange}
            tabStyleOverwrite={{ width: "49.5%" }}
            panelStyleOverwrite={{ padding: "40px 0" }}>
            <Tabs.List grow>
              <SwitcherTab value="login">Anmelden</SwitcherTab>
              <SwitcherTab value="register">Konto erstellen</SwitcherTab>
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
