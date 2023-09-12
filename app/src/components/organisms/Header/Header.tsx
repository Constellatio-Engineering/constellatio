import { Container } from "@mantine/core";
import { useMantineTheme } from "@mantine/styles";
import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";

import { SHeader } from "./Header.styles";
import * as styles from "./Header.styles";
import ConstellatioFullLogo from "../../../../public/images/icons/constellatio-full-logo.svg";
import { UserDropdown } from "../../molecules/UserDropdown/UserDropdown";

export interface HeaderProps 
{
  readonly variant?: "default" | "simple";
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
  ) : (
    <SHeader>
      <div css={styles.wrapper({ theme, variant })}>
        {/* <Container maw={1440}> */}
        <div>
          <Link href="/">
            <Image src={ConstellatioFullLogo} alt="Constellatio"/>
          </Link>
        </div>
        <div>
          <UserDropdown/>
        </div>
        {/* </Container> */}
      </div>
    </SHeader>
  );
};
