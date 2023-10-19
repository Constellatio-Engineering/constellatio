import React, { type FunctionComponent } from "react";

import * as styles from "./DashboardPage.styles";
import { Title } from "@mantine/core";

const DashboardPage: FunctionComponent = () => (
  <div css={styles.wrapper}>
    <Title order={3}>Dashboard</Title>
  </div>
);

export default DashboardPage;
