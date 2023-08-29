import { useMantineTheme } from "@mantine/core";
import React, { type FunctionComponent } from "react";

import * as styles from "./CountLabel.styles";
import { CaptionText } from "../CaptionText/CaptionText";

export interface ICountLabel 
{
  readonly count: number;
  readonly total: number;
  readonly variant: "success" | "error" | "cases" | "dictionary" | "neutral";
}

const CountLabel: FunctionComponent<ICountLabel> = ({ count, total, variant }) => 
{
  const theme = useMantineTheme();
  return (count !== null || count !== undefined) && (total !== null || total !== undefined) ? (
    <div css={styles.wrapper({ theme, variant })}>
      <CaptionText styleType="caption-01-bold">
        {count > total ? total : count} / {total}
      </CaptionText>
    </div>
  ) : (
    <></>
  );
};

export default CountLabel;
