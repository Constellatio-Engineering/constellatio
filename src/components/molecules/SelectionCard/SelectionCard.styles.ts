import styled from "@emotion/styled";

export const IconWrapper = styled.div<{ status: "success" | "error" | "default" }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing["spacing-2"]} 0;
  gap: ${({ theme }) => theme.spacing["spacing-4"]};

  svg {
    color: ${({ theme, status }) =>
      status === "success" ? theme.colors["support-success"][4] : theme.colors["support-error"][3]};
  }
`;
