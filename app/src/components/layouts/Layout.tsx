import { Footer } from "@/components/organisms/Footer/Footer";
import { Header } from "@/components/organisms/Header/Header";

import { AppShell } from "@mantine/core";
import { type ReactNode } from "react";

interface LayoutProps 
{
  readonly children?: ReactNode;
}

export function Layout({ children }: LayoutProps) 
{
  return (
    <div>
      <Header/>
      {children}
    </div>
  );
}
