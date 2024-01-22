import { Button } from "@/components/atoms/Button/Button";
import { appPaths } from "@/utils/paths";

import { Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import React, { type FunctionComponent } from "react";

import * as styles from "./DashboardPersonalSpaceBlockHeader.styles";

const DashboardPersonalSpaceBlockHeader: FunctionComponent = () => 
{
  const matches = useMediaQuery("(min-width: 1200px)");

  return (
    <div css={styles.wrapper}>
      <Title css={styles.headerTitle} order={2} tt="capitalize">Persönlicher Bereich</Title>
      <Link href={`${appPaths.personalSpace}`}>
        <Button<"button"> styleType="secondarySimple" type="button" size={matches ? "large" : "medium"}>Alle ansehen</Button>
      </Link>
    </div>
  );
};

export default DashboardPersonalSpaceBlockHeader;
