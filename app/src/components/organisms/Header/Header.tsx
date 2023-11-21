import { paths } from "@/utils/paths";

import { useMantineTheme } from "@mantine/styles";
import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";

import HeaderDefault from "./DefaultHeader/HeaderDefault";
import { SHeader } from "./Header.styles";
import * as styles from "./Header.styles";
import ConstellatioFullLogoPng from "../../../../public/images/full-logo.png";

export interface HeaderProps 
{
  readonly variant?: "default" | "simple" | "relative";
}

export const Header: FC<HeaderProps> = ({ variant = "default" }) => 
{
  const theme = useMantineTheme();
  // const isTabletScreen = useMediaQuery("(max-width: 1100px)");
  return variant === "simple" ? (
    <SHeader>
      <div css={styles.wrapper({ theme, variant })}>
        <div>
          <Link href={paths.dashboard}>
            <Image src={ConstellatioFullLogoPng} alt="Constellatio" width={150}/>
          </Link>
        </div>
      </div>
    </SHeader>
  ) : variant === "default" ? (
    <HeaderDefault/>
  ) : variant === "relative" && (
    <styles.SHeaderRelative>
      <Link href={paths.dashboard}>
        <Image src={ConstellatioFullLogoPng} alt="Constellatio" width={150}/>
      </Link>
    </styles.SHeaderRelative>
  );
};
