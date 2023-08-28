import { Header } from "@/components/organisms/Header/Header";

import { type FunctionComponent, type ReactNode } from "react";

interface LayoutProps 
{
  readonly children?: ReactNode;
}

export const Layout: FunctionComponent<LayoutProps> = ({ children }) => (
  <div>
    <Header/>
    {children}
  </div>
);
