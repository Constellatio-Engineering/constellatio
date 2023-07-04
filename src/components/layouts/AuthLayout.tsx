import type { ReactNode } from "react";
import { Container } from "@mantine/core";
import { AuthHeader } from "@/components/molecules/AuthHeader/AuthHeader";

type AuthLayoutProps = {
  children: ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <AuthHeader />
      <Container size={420} my={40}>
        {children}
      </Container>
    </>
  );
}
