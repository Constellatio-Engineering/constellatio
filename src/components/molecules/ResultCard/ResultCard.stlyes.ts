import styled from "@emotion/styled";

export const Card = styled.div<{ variant: "win" | "lose" | "incorrectOrder" }>`
  display: flex;
  padding: ${({ theme }) => theme.spacing["spacing-16"]};
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing["spacing-12"]};
  border-radius: ${({ theme }) => theme.radius["radius-12"]};
  box-shadow: ${({ theme }) => theme.shadows["elevation-big"]};
  background-color: ${({ theme, variant }) =>
    variant === "win" ? theme.colors["support-success"][4] : theme.colors["support-error"][0]};
`;

export const TextWrapper = styled.div<{ variant: "win" | "lose" | "incorrectOrder" }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing["spacing-12"]};
  align-items: center;

  color: ${({ theme, variant }) =>
    variant === "win" ? theme.colors["neutrals-01"][0] : theme.colors["support-error"][3]};
`;

export const IconWrapper = styled.div<{ variant: "win" | "lose" | "incorrectOrder" }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing["spacing-4"]};
  gap: ${({ theme }) => theme.spacing["spacing-10"]};
  border-radius: 50%;
  background-color: ${({ theme, variant }) =>
    variant === "win" ? theme.colors["support-success"][0] : theme.colors["support-error"][3]};
  box-shadow: ${({ theme }) => theme.shadows["elevation-big"]};

  svg {
    color: ${({ theme, variant }) =>
      variant === "win" ? theme.colors["support-success"][4] : theme.colors["neutrals-01"][0]};
  }
`;

export const LabelWrapper = styled.div<{ variant: "win" | "lose" | "incorrectOrder" }>`
  border-radius: ${({ theme }) => theme.radius["radius-8"]};

  > p {
    display: flex;
    padding: ${({ theme }) => theme.spacing["spacing-4"]} ${({ theme }) => theme.spacing["spacing-8"]};
    gap: ${({ theme }) => theme.spacing["spacing-10"]};
    border-radius: ${({ theme }) => theme.radius["full"]};
    background-color: ${({ theme, variant }) =>
      variant === "win" ? theme.colors["support-success"][3] : theme.colors["support-error"][3]};

    color: ${({ theme }) => theme.colors["neutrals-01"][0]};
  }
`;
