import { Button } from "@/components/atoms/Button/Button";
import Label from "@/components/atoms/label/Label";

import { appPaths } from "@constellatio/shared/paths";
import { Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import React, { type FunctionComponent } from "react";

import * as styles from "./DashboardCasesBlockHeader.styles";

const DashboardCasesBlockHeader: FunctionComponent = () => 
{
  const isBigScreen = useMediaQuery("(min-width: 1200px)");

  return (
    <div css={styles.wrapper}>
      <div>
        <Label variant="case" title="FÄLLE"/>
        <Title css={styles.casesHeaderTitle} order={2}>Nächste offene Fälle</Title>
      </div>
      <Link href={appPaths.cases}>
        <Button<"button"> size={isBigScreen ? "large" : "medium"} styleType="secondarySimple">Alle ansehen</Button>
      </Link>
    </div>
  );
};

export default DashboardCasesBlockHeader;
