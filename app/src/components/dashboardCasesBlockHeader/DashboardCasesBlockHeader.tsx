import { Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { type FunctionComponent } from "react";

import * as styles from "./DashboardCasesBlockHeader.styles";
import { Button } from "../atoms/Button/Button";
import Label from "../atoms/label/Label";

const DashboardCasesBlockHeader: FunctionComponent = () => 
{
  const isBigScreen = useMediaQuery("(min-width: 1200px)");
  
  return (
    <div css={styles.wrapper}>
      <div>
        <Label variant="case" title="Cases"/>
        <Title css={styles.casesHeaderTitle} order={2}>Next cases to complete</Title>
      </div>
      <Button<"button"> size={isBigScreen ? "large" : "medium"} styleType="secondarySimple">View All</Button>
    </div>
  );
};

export default DashboardCasesBlockHeader;
