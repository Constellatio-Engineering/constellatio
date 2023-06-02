import type { ReactNode } from "react";
import { AppShell, Container } from "@mantine/core";
import { Footer } from "@/components/molecules/Footer/Footer";

type AuthLayoutProps = {
  children: ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <AppShell footer={<Footer />}>
      <Container size={420} my={40}>
        {children}
      </Container>
    </AppShell>
  );
}
