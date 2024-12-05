import { colooors } from "@/constants/styles/colors";
import type { UnknownMantineStylesParams } from "@/utils/types";

import { css } from "@emotion/react";
import { type Styles, type ModalStylesNames, type DrawerStylesNames } from "@mantine/core";

export const contentWrapper = css`
  padding-top: 60px;
`;

export const layoutWrapper = css`
  display: flex;
  gap: 50px;
`;

export const card = css`
  background-color: #ffffff;
  border: 1px solid #f0f0f0;
  padding: 24px;
  border-radius: 12px;
`;

export const unitsColumn = css`
  display: flex;
  flex-direction: column;
  gap: 30px;
  flex: 1;
  min-width: 0;
`;
