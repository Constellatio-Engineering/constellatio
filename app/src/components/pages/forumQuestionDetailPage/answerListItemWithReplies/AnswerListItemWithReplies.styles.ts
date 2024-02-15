import { colors } from "@/constants/styles/colors";
import type { UnknownMantineStylesParams } from "@/utils/types";

import { css } from "@emotion/react";
import type { ModalStylesNames } from "@mantine/core";
import type { Styles } from "@mantine/styles";

export const repliesWrapper = css`
  padding-left: 80px;
  > * {
    margin-top: 12px;
  }
`;

export const listItemAddReplyButtonWrapper = css`
  padding: 0;
  border: 1px solid ${colors["neutrals-01"][5]};
`;

export const test = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
