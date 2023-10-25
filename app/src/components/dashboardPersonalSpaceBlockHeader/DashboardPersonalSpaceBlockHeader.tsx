import { paths } from "@/utils/paths";

import { Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import React, { type FunctionComponent } from "react";

import * as styles from "./DashboardPersonalSpaceBlockHeader.styles";
import { Button } from "../atoms/Button/Button";

const DashboardPersonalSpaceBlockHeader: FunctionComponent = () => 
{
  const matches = useMediaQuery("(min-width: 1200px)");

  return (
    <div css={styles.wrapper}>
      <Title css={styles.headerTitle} order={2}>Personal space</Title>
      <Link href={`${paths.personalSpace}`}>
        <Button<"button"> styleType="secondarySimple" size={matches ? "large" : "medium"} type="button">View all</Button>
      </Link>
    </div>
  );
};

export default DashboardPersonalSpaceBlockHeader;
