import Image from "next/image";
import { type FC } from "react";

import HeaderDefault from "./DefaultHeader/HeaderDefault";
import * as styles from "./Header.styles";
import { SHeader } from "./Header.styles";
import ConstellatioFullLogoPng from "../../../../public/images/full-logo.png";

export interface HeaderProps 
{
  readonly variant?: "default" | "simple" | "relative";
}

export const Header: FC<HeaderProps> = ({ variant = "default" }) => 
{
  // const isTabletScreen = useMediaQuery("(max-width: 1100px)");
  return variant === "simple" ? (
    <SHeader>
      <div css={styles.wrapper({ variant })}>
        <div>
          <Image src={ConstellatioFullLogoPng} alt="Constellatio" width={150}/>
        </div>
      </div>
    </SHeader>
  ) : variant === "default" ? (
    <HeaderDefault/>
  ) : variant === "relative" && (
    <styles.SHeaderRelative>
      <Image src={ConstellatioFullLogoPng} alt="Constellatio" width={150}/>
    </styles.SHeaderRelative>
  );
};
