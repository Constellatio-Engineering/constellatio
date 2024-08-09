import { css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";
import { type SerializedStyles } from "@mantine/styles/lib/tss/types/css-object";

const SharedCSS = css`
  padding: 1px 10px;
  height: 30px;
  white-space: nowrap;
  display: flex;
  justify-content:    center;
  align-items: center;
  width: max-content;
  gap: 4px;
  border-radius:1000px ;
  border: 1px solid;
`;

export const notStarted = (theme: MantineTheme): SerializedStyles => css`
  ${SharedCSS};
  background-color: ${theme.colors["neutrals-01"][2]} !important;
  border-color: ${theme.colors["neutrals-01"][3]};
  color: ${theme.colors["neutrals-01"][7]};
`;

export const inProgress = (theme: MantineTheme): SerializedStyles => css`
  ${SharedCSS};
  background-color: ${theme.colors["support-notice"][0]} !important;
  border-color: ${theme.colors["support-notice"][1]};
  color: ${theme.colors["support-notice"][4]};
`;

export const completed = (theme: MantineTheme): SerializedStyles => css`
  ${SharedCSS};
  background-color: ${theme.colors["support-success"][0]} !important;
  border-color: ${theme.colors["support-success"][1]};
  color: ${theme.colors["support-success"][4]};
`;
