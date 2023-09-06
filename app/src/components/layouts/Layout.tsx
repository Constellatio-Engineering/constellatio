import { Header } from "@/components/organisms/Header/Header";

import { type FunctionComponent, type ReactNode } from "react";

import * as styles from "./Layout.styles";
import { Footer } from "../organisms/Footer/Footer";

interface LayoutProps 
{
  readonly children?: ReactNode;
}

export const Layout: FunctionComponent<LayoutProps> = ({ children }) => (
  <main css={styles.wrapper}>
    <Header/>
    {children}
    <Footer/>
  </main>
);
