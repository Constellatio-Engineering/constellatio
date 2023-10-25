import { Title } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./DashboardCasesBlockHeader.styles";
import { Button } from "../atoms/Button/Button";
import Label from "../atoms/label/Label";

const DashboardCasesBlockHeader: FunctionComponent = () => (
  <div css={styles.wrapper}>
    <div>
      <Label variant="case" title="Cases"/>
      <Title css={styles.casesHeaderTitle} order={2}>Nächste offene Fälle</Title>
    </div>
    <Button<"button"> styleType="secondarySimple">Alle ansehen</Button>
  </div>
);

export default DashboardCasesBlockHeader;
