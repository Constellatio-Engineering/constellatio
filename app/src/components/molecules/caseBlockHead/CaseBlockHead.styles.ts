import { type SerializedStyles, css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";
export const wrapper = css`
width: 240px;

`;
export const detailText = (theme: MantineTheme): SerializedStyles => css`
p{
    margin-top:10px;
}
color:${theme.colors["cc-cases"][2]}
`;
