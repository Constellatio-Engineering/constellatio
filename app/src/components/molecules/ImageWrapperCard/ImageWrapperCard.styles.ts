import { colors } from "@/constants/styles/colors";
import { radius } from "@/constants/styles/radius";
import { spacing } from "@/constants/styles/spacing";

import { css } from "@emotion/react";

export const wrapper = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing["spacing-24"]};
`;

export const imageWrapper = css`
  width: 100%;
  min-height: 300px;
  align-items: flex-start;
  background-color: ${colors["neutrals-01"][0]};
  border: 1px solid ${colors["neutrals-01"][3]};
  border-radius: ${radius["radius-12"]};
  display: flex;
  gap: ${spacing["spacing-8"]};
  padding: ${spacing["spacing-8"]};
  position: relative;
`;

export const iconWrapper = css`
  align-items: center;
  bottom: 20px;
  display: flex;
  gap: 6px;
  position: absolute;
  right: 20px;
  button:first-of-type {
    transform: rotate(180deg);
  }
`;
