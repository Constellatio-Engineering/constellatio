import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";
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

export const notStarted = (): SerializedStyles => css`
  ${SharedCSS};
  background-color: ${colooors["neutrals-01"][2]} !important;
  border-color: ${colooors["neutrals-01"][3]};
  color: ${colooors["neutrals-01"][7]};
`;

export const inProgress = (): SerializedStyles => css`
  ${SharedCSS};
  background-color: ${colooors["support-notice"][0]} !important;
  border-color: ${colooors["support-notice"][1]};
  color: ${colooors["support-notice"][4]};
`;

export const completed = (): SerializedStyles => css`
  ${SharedCSS};
  background-color: ${colooors["support-success"][0]} !important;
  border-color: ${colooors["support-success"][1]};
  color: ${colooors["support-success"][4]};
`;
