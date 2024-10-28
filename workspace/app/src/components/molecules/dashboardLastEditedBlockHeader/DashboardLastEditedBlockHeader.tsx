import { Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./DashboardLastEditedBlockHeader.styles";

const DashboardLastEditedBlockHeader: FunctionComponent = () =>
{
  return (
    <div css={styles.wrapper}>
      <Title css={styles.headerTitle} order={2} tt="capitalize">Zuletzt bearbeitet</Title>
    </div>
  );
};

export default DashboardLastEditedBlockHeader;
