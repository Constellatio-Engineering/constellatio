import { paths } from "@/utils/paths";

import { Title } from "@mantine/core";
import Link from "next/link";
import React, { type FunctionComponent } from "react";

import * as styles from "./DashboardPersonalSpaceBlockHeader.styles";
import { Button } from "../atoms/Button/Button";

const DashboardPersonalSpaceBlockHeader: FunctionComponent = () => 
{
  return (
    <div css={styles.wrapper}>
      <Title css={styles.headerTitle} order={3}>Personal Space</Title>
      <Link href={`${paths.personalSpace}`}>
        <Button<"button"> styleType="secondarySimple" type="button">View all</Button>
      </Link>
    </div>
  );
};

export default DashboardPersonalSpaceBlockHeader;
