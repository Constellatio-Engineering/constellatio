import { AppShell } from "@mantine/core";
import { ReactNode } from "react";
import { Header } from "@/components/organisms/Header/Header";
import { Footer } from "@/components/organisms/Footer/Footer";

type LayoutProps = {
  children?: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <AppShell header={<Header />} footer={<Footer />} maw={1440}>
      {children}
    </AppShell>
  );
}
