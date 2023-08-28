import { css } from "@emotion/react";
import { MantineTheme } from "@mantine/styles";

export const button = (theme:MantineTheme) => css`
 padding: 8px 16px;
  background-color: ${theme.colors[`neutrals-01`][0]};
  border-radius: 100px;
  display: flex;
  gap: 4px;
  place-items: center;
  cursor: pointer;
  outline: 0;
  border: 0;
  border: 1px solid ${theme.colors['neutrals-01'][3]};

  &:hover{
    background-color: ${theme.colors[`neutrals-01`][1]};
    border: 1px solid ${theme.colors['neutrals-01'][5]};
  }
  &:active{
    background-color: ${theme.colors[`neutrals-01`][3]};
    border: 1px solid ${theme.colors['neutrals-01'][5]};
  }
  &:disabled{
    cursor: default;
    opacity:0.5
  }
`;


export const icon = ({theme,disabled}:{theme:MantineTheme,disabled:boolean|undefined}) => css`
color:${disabled ? theme.colors['neutrals-01'][7] : theme.colors['neutrals-02'][1]};
`;