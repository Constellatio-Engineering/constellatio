import { useMantineTheme } from "@mantine/styles";
import React from "react";

import * as styles from "./BarChart.styles";

interface BarProps 
{
  readonly height: number;
}

const Bar: React.FC<BarProps> = ({ height }) => 
{
  const theme = useMantineTheme();
  return (
    <div
      css={styles.bar({ height, theme })}
    />
  );
};

export default Bar;
