import { Button } from "@/components/atoms/Button/Button";
import MenuTab from "@/components/atoms/menuTab/MenuTab";
import SearchFieldSmall from "@/components/molecules/searchFieldSmall/SearchFieldSmall";
import { isDevelopmentOrStaging } from "@/utils/env";

import { Loader } from "@mantine/core";
import { useMantineTheme } from "@mantine/styles";
import { IconFolder } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
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
  const { isLoading: isRecreatingSearchIndices, mutate: recreateSearchIndices } = useMutation({
    mutationFn: async () => axios.post("/api/search/recreate-search-indices"),
    onError: (e: unknown) => console.log("error while recreating search indices", e instanceof AxiosError ? e.response?.data : e),
    onSuccess: () => console.log("successfully recreated search indices"),
  });

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
          {links.map((link, linkIndex) => <Link href={`/${link.toLowerCase()}`} key={linkIndex}><MenuTab active={pathname?.toLowerCase().includes(link.toLowerCase())} title={link}/></Link>)}
        </div>
        <div css={styles.profileArea}>
          {isDevelopmentOrStaging && (
            <div style={{ alignItems: "center", display: "flex" }}>
              <Button<"button">
                styleType="secondarySubtle"
                disabled={isRecreatingSearchIndices}
                type="button"
                onClick={() => recreateSearchIndices()}
                style={{ marginRight: 10 }}>
                Recreate Search Indices
              </Button>
              {isRecreatingSearchIndices && <Loader size={22}/>}
            </div>
          )}
          <div className="search-input"><SearchFieldSmall/></div>
          <Link href="/personal-space"><MenuTab title="Persoanl Space" icon={<IconFolder/>} active={pathname?.toLowerCase().includes("personal-space")}/></Link>
          <span className="vertical-line">s</span>
          <div>
            <UserDropdown/>
          </div>
        </div>
      </div>
    </SHeader>
  );
};
