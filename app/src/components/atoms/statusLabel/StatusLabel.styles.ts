import { MantineTheme } from '@mantine/styles';
import { InProgress } from './StatusLabel.stories';
import { css } from "@emotion/react";

const SharedCSS = css`
padding: 4px 10px;
display: flex;
justify-content:    center;
align-items: center;
width: max-content;
gap: 4px;
border-radius:1000px ;
/* border:  0px; */
`


export const notStarted = (theme:MantineTheme) => css`
${SharedCSS};
background-color: ${theme.colors['neutrals-01'][2]};
border:  1px solid ${theme.colors['neutrals-01'][3]};
`;

export const inProgress = (theme:MantineTheme) => css`
${SharedCSS};
background-color: ${theme.colors['support-notice'][0]};
`;

export const completed = (theme:MantineTheme) => css`
${SharedCSS};
background-color: ${theme.colors['support-success'][0]};
`;
