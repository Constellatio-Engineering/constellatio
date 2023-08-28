import React, { FunctionComponent } from "react";

import * as styles from "./CountLabel.styles";
import { CaptionText } from "../CaptionText/CaptionText";
import { useMantineTheme } from "@mantine/core";

export interface ICountLabel {
  variant: "success" | "error" | "cases" | "dictionary" | "neutral";
  count: number;
  total: number;
}

const CountLabel: FunctionComponent<ICountLabel> = ({
  variant,
  count,
  total,
}) => {
  const theme = useMantineTheme();
  return (count !== null || count !== undefined) && (total !== null || total !== undefined) ? (
    <div css={styles.wrapper({ theme, variant })}>
      <CaptionText styleType={"caption-01-bold"}>
        {count > total ? total : count} / {total}
      </CaptionText>
    </div>
  ) : (
    <></>
  );
};

export default CountLabel;
