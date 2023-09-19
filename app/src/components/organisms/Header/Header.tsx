import MenuTab from "@/components/atoms/menuTab/MenuTab";
import SearchFieldSmall from "@/components/molecules/searchFieldSmall/SearchFieldSmall";

import { useMantineTheme } from "@mantine/styles";
import { IconFolder } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
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
  const links = ["CASES", "DICTIONARY"];
  const { pathname } = useRouter();

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
        <div css={styles.links}>
          <Link href="/">
            <Image src={ConstellatioFullLogo} alt="Constellatio"/>
          </Link>
          {
            links.map((link, linkIndex) => 
            {
              return <Link href={`/${link.toLowerCase()}`} key={linkIndex}><MenuTab active={pathname?.toLowerCase().includes(link.toLowerCase())} title={link}/></Link>;
            })
          }
        </div>
        <div css={styles.profileArea}>
          <div className="search-input"><SearchFieldSmall/></div>
          <Link href="personal-space"><MenuTab title="Persoanl Space" icon={<IconFolder/>}/></Link>
          <span className="vertical-line">s</span>
          <UserDropdown/>
        </div>
      </div>
    </SHeader>
  );
};
