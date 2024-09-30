import { colooors } from "@/constants/styles/colors";
import { spaciiing } from "@/constants/styles/spacing";

import styled from "@emotion/styled";

export const Card = styled.div<{ variant: "win" | "lose" }>`
  display: flex;
  padding: ${spaciiing["spacing-16"]};
  align-items: center;
  justify-content: space-between;
  gap: ${spaciiing["spacing-12"]};
  border-radius: ${({ theme }) => theme.radius["radius-12"]};
  box-shadow: ${({ theme }) => theme.shadows["elevation-big"]};
  background-color: ${({ variant }) =>
    variant === "win" ? colooors["support-success"][4] : colooors["support-error"][0]};
`;

export const TextWrapper = styled.div<{ variant: "win" | "lose" }>`
  display: flex;
  gap: ${spaciiing["spacing-12"]};
  align-items: center;

  color: ${({ variant }) =>
    variant === "win" ? colooors["neutrals-01"][0] : colooors["support-error"][3]};
`;

export const IconWrapper = styled.div<{ variant: "win" | "lose" }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spaciiing["spacing-4"]};
  gap: ${spaciiing["spacing-10"]};
  border-radius: 50%;
  background-color: ${({ variant }) =>
    variant === "win" ? colooors["support-success"][0] : colooors["support-error"][3]};
  box-shadow: ${({ theme }) => theme.shadows["elevation-big"]};

  svg {
    color: ${({ variant }) =>
    variant === "win" ? colooors["support-success"][4] : colooors["neutrals-01"][0]};
  }
`;

export const LabelWrapper = styled.div<{ variant: "win" | "lose" }>`
  border-radius: ${({ theme }) => theme.radius["radius-8"]};
  white-space: nowrap;
  > p {
    display: flex;
    padding: ${spaciiing["spacing-4"]} ${spaciiing["spacing-8"]};
    gap: ${spaciiing["spacing-10"]};
    border-radius: ${({ theme }) => theme.radius.full};
    background-color: ${({ variant }) =>
    variant === "win" ? colooors["support-success"][3] : colooors["support-error"][3]};

    color: ${colooors["neutrals-01"][0]};
  }
`;
