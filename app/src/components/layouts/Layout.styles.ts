import { type SerializedStyles, css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = (theme: MantineTheme): SerializedStyles => css`
margin: 0 auto;
background-color: ${theme.colors["neutrals-01"][2]};
`;
export const main = css`
    margin-top:60px;
`;
