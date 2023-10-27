import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";
const CSSShowAllAreaCommons = (theme: MantineTheme) => css`
position:absolute;
        content: "";
        top:50%;
        background-color: ${theme.colors["neutrals-01"][3]};
        width: 41%;
        height: 1px;
`;
export const wrapper = css`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
`;
export const showAllArea = (theme: MantineTheme) => css`
  background-color: ${theme.colors["neutrals-01"][0]};
  width: 100%;
  transform: translateY(-0px);
  position: relative;
    &::after{
        ${CSSShowAllAreaCommons(theme)}
        left: 16px;
    }
    &::before{
        ${CSSShowAllAreaCommons(theme)}
        right: 16px;
    }
`;
export const showAllButton = (theme: MantineTheme) => css`
    margin: 0 auto;
    display: block;
    border: 1px solid ${theme.colors["neutrals-01"][3]};
    `;
export const showAllGredient = (theme: MantineTheme) => css`
        position: absolute;
        top: -130px;
        left: 0;
        background: linear-gradient(to top, ${theme.colors["neutrals-01"][0]} 30%, transparent 100%);
        width:100%;
        height: 130px;
`;
