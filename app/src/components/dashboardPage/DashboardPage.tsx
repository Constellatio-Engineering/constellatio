import { Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./DashboardPage.styles";

const DashboardPage: FunctionComponent = () => (
  <div css={styles.wrapper}>
    <Title order={3}>Dashboard</Title>
  </div>
);

export default DashboardPage;
