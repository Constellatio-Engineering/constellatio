import { Tabs } from "@mantine/core";
import { useRouter } from "next/router";
import { LoginForm } from "@/components/organisms/LoginForm/LoginForm";

type AuthPageProps = {
  tab: "login" | "register";
};

export function AuthPage({ tab }: AuthPageProps) {
  const router = useRouter();

  const handleTabChange = (value: AuthPageProps["tab"]) =>
    router.push(`/${value}`);

  return (
    <Tabs value={tab} onTabChange={handleTabChange}>
      <Tabs.List grow>
        <Tabs.Tab value="login">Login</Tabs.Tab>
        <Tabs.Tab value="register">Register</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="login">
        <LoginForm />
      </Tabs.Panel>
      <Tabs.Panel value="register">{null}</Tabs.Panel>
    </Tabs>
  );
}
