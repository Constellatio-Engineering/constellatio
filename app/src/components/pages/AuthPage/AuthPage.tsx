import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { CustomLink } from "@/components/atoms/CustomLink/CustomLink";
import { SwitcherTab } from "@/components/atoms/Switcher-tab/SwitcherTab";
import { Switcher } from "@/components/molecules/Switcher/Switcher";
import { Header } from "@/components/organisms/Header/Header";
import { LoginForm } from "@/components/organisms/LoginForm/LoginForm";
import { RegistrationForm } from "@/components/organisms/RegistrationForm/RegistrationForm";
import { RegistrationVisualHeader } from "@/components/organisms/RegistrationVisualHeader/RegistrationVisualHeader";

import { Container, Flex, Tabs } from "@mantine/core";
import { useRouter } from "next/router";
import { type FC } from "react";

export interface AuthPageProps
{
  readonly tab: "login" | "register";
}

export const AuthPage: FC<AuthPageProps> = ({ tab }) =>
{
  const router = useRouter();

  const handleTabChange: (value: AuthPageProps["tab"]) => Promise<boolean> = async (value) =>
    router.push(`/${value}`);
  return (
    <Flex
      justify="space-between"
      bg="brand-01.5"
      sx={{ height: "100vh", minHeight: 600, overflow: "hidden" }}>
      <RegistrationVisualHeader/>
      <Container
        w="100%"
        sx={(theme) => ({
          backgroundColor: theme.colors["neutrals-01"][0],
          borderRadius: `${theme.radius["radius-16"]} 0 0 ${theme.radius["radius-16"]}`,
          overflowY: "scroll",
          padding: 0,
        })}>
        <Header variant="simple"/>
        <Container w={440} pt={120} pb={tab === "register" ? "spacing-100" : 0}>
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
          <BodyText component="p" styleType="body-02-medium" c="neutrals-01.7">
            Note: This version of Constellatio is optimized for computer use
            only. If you have any technical questions, please contact our
            support at&nbsp;
            <CustomLink
              href="mailto:webmaster@constellatio.de"
              styleType="link-secondary"
              c="neutrals-01.7">
              webmaster@constellatio.de
            </CustomLink>
          </BodyText>
        </Container>
      </Container>
    </Flex>
  );
};
