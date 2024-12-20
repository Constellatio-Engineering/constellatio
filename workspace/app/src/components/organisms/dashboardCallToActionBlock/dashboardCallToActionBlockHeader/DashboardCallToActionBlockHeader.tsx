import Label from "@/components/atoms/label/Label";

import { Title } from "@mantine/core";
import { type FunctionComponent } from "react";

import * as styles from "./DashboardCallToActionBlockHeader.styles";

const DashboardCallToActionBlockHeader: FunctionComponent = () => 
{
  return (
    <div css={styles.wrapper}>
      <div>
        <Label variant="learning-path" title="Für Dich"/>
        <Title css={styles.casesHeaderTitle} order={2}>Hier gehts los</Title>
      </div>
    </div>
  );
};

export default DashboardCallToActionBlockHeader;
