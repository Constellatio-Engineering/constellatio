import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";
import { type SerializedStyles } from "@mantine/styles/lib/tss/types/css-object";

const SharedCSS = css`
padding: 4px 10px;
display: flex;
justify-content:    center;
align-items: center;
width: max-content;
gap: 4px;
border-radius:1000px ;
/* border:  0px; */
`;

export const notStarted = (theme: MantineTheme): SerializedStyles => css`
${SharedCSS};
background-color: ${theme.colors["neutrals-01"][2]};
border:  1px solid ${theme.colors["neutrals-01"][3]};
color: ${theme.colors["neutrals-01"][7]};
`;

export const inProgress = (theme: MantineTheme): SerializedStyles => css`
${SharedCSS};
background-color: ${theme.colors["support-notice"][0]};
color: ${theme.colors["support-notice"][4]};
`;

export const completed = (theme: MantineTheme): SerializedStyles => css`
${SharedCSS};
background-color: ${theme.colors["support-success"][0]};
color: ${theme.colors["support-success"][4]};
`;
