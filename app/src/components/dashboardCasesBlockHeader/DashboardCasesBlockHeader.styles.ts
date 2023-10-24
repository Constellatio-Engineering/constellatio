import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = css`
width:254px;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: flex-start;
`;
export const casesHeaderTitle = (theme: MantineTheme) => css`
    color: ${theme.colors["neutrals-02"][1]};
    margin :24px 0;
`;
