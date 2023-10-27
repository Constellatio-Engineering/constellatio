import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
background: ${theme.colors["neutrals-01"][0]};
padding: 32px;
border-radius: 8px;
display: flex;  
gap: 60px;
align-items: flex-start;
box-shadow: ${theme.shadows["elevation-big"]};
margin: 24px 0;

> div :nth-of-type(2) {
  width: 100%;
}
`;
export const blockHeadTitle = css`

margin-top: 12px;
margin-bottom: 24px;
`;
