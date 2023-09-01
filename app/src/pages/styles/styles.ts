import { type SerializedStyles, css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const ListWrapper = css`
transform: translateY(-120px);
width: 90%;
margin: 0 auto;
display: grid;
`;

export const Page = (theme: MantineTheme): SerializedStyles => css`
    background-color: ${theme.colors["neutrals-01"][2]};
    min-height: 100vh;
    position: relative;
`;
