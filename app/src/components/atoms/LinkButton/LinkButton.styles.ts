import { colooors } from "@/constants/styles/colors";
import { spaciiing } from "@/constants/styles/spacing";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const SButton = styled.button<{ size?: "big" | "medium" }>`
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-family: inherit;
  &:disabled {
    cursor: not-allowed;
    svg {
      opacity: .3;
    }
  }

  ${({ size, theme }) => css`
    color: ${colooors["neutrals-01"][9]};
    font-size: ${size === "big" ? theme.fontSizes["spacing-16"] : theme.fontSizes["spacing-14"]};
    font-weight: 500;
    line-height: ${size === "big" ? spaciiing["spacing-24"] : spaciiing["spacing-20"]};
    transition: all 0.3s ease;

    :hover {
      color: ${colooors["neutrals-02"][1]};
    }

    :disabled {
      color: ${colooors["neutrals-01"][7]};
    }

    svg {
      width: ${size === "big" ? spaciiing["spacing-20"] : spaciiing["spacing-16"]};
      height: ${size === "big" ? spaciiing["spacing-20"] : spaciiing["spacing-16"]};
    }
  `}
`;
