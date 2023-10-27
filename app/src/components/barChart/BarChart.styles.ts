import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const bar = ({ height, theme }: {
  height: number;
  theme: MantineTheme;
}) => css`
  width: 11px;
  margin: 0 0px 8px 0px;
  border-radius: 5px;
  height:120px;
  position: relative;
  background-color: ${theme.colors["neutrals-01"][2]};
  border: 1px solid ${theme.colors["neutrals-01"][3]};
  &::after {
      background-color: ${theme.colors["brand-02"][4]};
      height: ${height * 10}px;
      position: absolute;
    width: 9px;
    border-radius: 5px;
    bottom: 0;
    content: "";
  }
`;
export const barChartContainer = css`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  min-height: 160px;
`;
export const barChartMonth = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
