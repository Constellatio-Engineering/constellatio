import { env } from "@/env.mjs";

import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const widthPercentage = 72;

export const wrapper = (theme: MantineTheme) => css`
  background-color: ${theme.colors["neutrals-01"][0]};
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;   
  width: ${env.NEXT_PUBLIC_IS_USAGE_TIME_CHART_ENABLED ? widthPercentage : 100}%;
  min-height: 300px;
`;
