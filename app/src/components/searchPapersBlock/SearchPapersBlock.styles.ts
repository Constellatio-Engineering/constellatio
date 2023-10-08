import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme) => css`
background: ${theme.colors["neutrals-01"][0]};
padding: 32px;
border-radius: 12px;
display: flex;  
justify-content: space-between;
align-items: flex-start;
overflow:hidden;
`;
export const blockHeadTitle = css`

margin-top: 12px;
margin-bottom: 24px;
`;
