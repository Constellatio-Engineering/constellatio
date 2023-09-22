import { css } from "@emotion/react";
import { MantineTheme } from "@mantine/styles";

const CSSActiveStyles= (theme:MantineTheme) => css`
 background-color: ${theme.colors["neutrals-01"][3]};
 border-left: 3px solid ${theme.colors["neutrals-02"][1]};
p{ svg{
    color: ${theme.colors["neutrals-02"][1]};
 }}
`

export const wrapper = ({theme,active}:{theme: MantineTheme,active?:boolean}) => css`
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid ${theme.colors["neutrals-01"][3]};
  background-color: ${theme.colors["neutrals-01"][0]};
  &:hover {
    background-color: ${theme.colors["neutrals-01"][2]};
  }
  p {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .label {
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      width: 100%;
      text-overflow: ellipsis;
      
      svg {
        margin-right: 8px;
        vertical-align: bottom;
        color: ${theme.colors["neutrals-01"][7]};
      }
    }
    svg {
      min-width: 24px;
      min-height: 24px;
      color: ${theme.colors["neutrals-01"][9]};
    }
  }
  .label{
    display:flex;
    justify-content: flex-start;
    gap:8px;
    align-items: center;
  }
  ${active && CSSActiveStyles(theme)}
`;
