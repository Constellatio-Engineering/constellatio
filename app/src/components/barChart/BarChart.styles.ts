import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const bar = ({ height, theme }: {
  height: number;
  theme: MantineTheme;
}) => css`
  width: 11px;
  margin: 0 0px 8px 0px;
  border-radius: 5px;
  height:122px;
  position: relative;
  background-color: ${theme.colors["neutrals-01"][2]};
  border: 1px solid ${theme.colors["neutrals-01"][3]};
  &::after {
      background-color: ${theme.colors["brand-02"][4]};
      height: ${height * 10}px;
      position: absolute;
    width: 7px;
    border-radius: 5px;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    content: "";
  }
 
`;
export const barChartContainer = (theme: MantineTheme) => css`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  min-height: 160px;
  position: relative;
  padding-left: 20px;
  width: 100%;
  p{
    color: ${theme.colors["neutrals-01"][7]};
  }
`;
export const barChartMonth = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CommonYaxisProps = (theme: MantineTheme) => css`
content: "";
  position: absolute;
  transform: translateY(-50%);
  left: 30px;
  width: calc(100% - 40px);
  height: 2px;
  background-color: ${theme.colors["neutrals-01"][3]};
`;
export const yAxis = (theme: MantineTheme) => css`
position: absolute;
left:0;
bottom: 20px;
color: ${theme.colors["neutrals-01"][7]};
height: 130px;
display: flex;
flex-direction: column-reverse;
justify-content: space-between;
align-items: flex-start;
width: 100%;
&::after {
  ${CommonYaxisProps(theme)}
  bottom: 3px;
}
&::before {
  ${CommonYaxisProps(theme)}
  top: 50%;
}
.heighestValueLine {
  ${CommonYaxisProps(theme)}
  top: 5px;
}
`;

