import { Header } from "@/components/organisms/Header/Header";

import { type FunctionComponent, type ReactElement } from "react";

import * as styles from "./Layout.styles";
import { Footer } from "../organisms/Footer/Footer";

export const Layout: FunctionComponent<ReactElement> = (page) => (
  <div css={styles.wrapper}>
    <Header variant="default"/>
    <main css={styles.main}>
      {page}
    </main>
    <Footer/>
  </div>
);
