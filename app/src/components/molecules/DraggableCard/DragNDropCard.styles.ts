import styled from "@emotion/styled";

export const Card = styled.div<{ dropped?: boolean; status: "success" | "error" | "default" }>`
    display: flex;
    align-items: center;
    cursor: grab;
    justify-content: space-between;
    padding: ${({ theme }) => theme.spacing["spacing-12"]};
    gap: ${({ theme }) => theme.spacing["spacing-4"]};
    border-radius: ${({ theme }) => theme.radius["radius-8"]};
    border: 1px solid ${({ dropped, status, theme }) =>
    dropped
      ? status === "success"
        ? theme.colors["support-success"][4]
        : status === "error"
          ? theme.colors["support-error"][3]
          : theme.colors["neutrals-01"][3]
      : status === "success"
        ? theme.colors["support-error"][3]
        : theme.colors["neutrals-01"][3]};

    background-color: ${({ theme }) => theme.colors["neutrals-01"][0]};
    width: 100%;
    appearance: none;
    outline: none;
    transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;

    > div svg {
        color: ${({ theme }) => theme.colors["neutrals-01"][7]};
    }

    &:hover {
        border-color: ${({ status, theme }) => status === "default" && theme.colors["neutrals-01"][4]};
        background-color: ${({ status, theme }) => status === "default" && theme.colors["neutrals-01"][1]};

        svg {
            color: ${({ status, theme }) => status === "default" && theme.colors["neutrals-02"][1]};
        }
    }

    &:active {
        border-color: #d4d4d4;
        background-color: ${({ theme }) => theme.colors["neutrals-01"][1]};
    }
`;

export const StatusWrapper = styled.div<{ dropped?: boolean; status: "default" | "success" | "error" }>`
  display: ${({ dropped, status }) => (dropped && status === "default" ? "flex" : "none")};
  appearance: none;
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
`;

export const ResultWrapper = styled.div<{ status: "default" | "success" | "error" }>`
  display: ${({ status }) => (status === "default" ? "none" : "flex")};
  color: ${({ theme }) => theme.colors["neutrals-01"][7]};
  align-items: center;
  gap: ${({ theme }) => theme.spacing["spacing-8"]};
`;
