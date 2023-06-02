import { AppShell } from "@mantine/core";
import { ReactNode } from "react";
import { Header } from "@/components/molecules/Header/Header";
import { Footer } from "@/components/molecules/Footer/Footer";

type LayoutProps = {
  children?: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <AppShell header={<Header />} footer={<Footer />}>
      {children}
    </AppShell>
  );
}
