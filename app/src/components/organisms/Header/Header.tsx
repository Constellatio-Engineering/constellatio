
import { useMantineTheme } from "@mantine/styles";
import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";

import { SHeader } from "./Header.styles";
import * as styles from "./Header.styles";
import HeaderDefault from "./HeaderDefault";
import ConstellatioFullLogo from "../../../../public/images/icons/constellatio-full-logo.svg";

export interface HeaderProps 
{
  readonly variant?: "default" | "simple" | "relative";
}

export const Header: FC<HeaderProps> = ({ variant = "default" }) => 
{
  const theme = useMantineTheme();

  return variant === "simple" ? (
    <SHeader>
      <div css={styles.wrapper({ theme, variant })}>
        <div>
          <Link href="/">
            <Image src={ConstellatioFullLogo} alt="Constellatio"/>
          </Link>
        </div>
      </div>
    </SHeader>
  ) : variant === "default" ? (
    <HeaderDefault/>
  ) : variant === "relative" && (
    <styles.SHeaderRelative>
      <Link href="/">
        <Image src={ConstellatioFullLogo} alt="Constellatio"/>
      </Link>
    </styles.SHeaderRelative>
  );
};
