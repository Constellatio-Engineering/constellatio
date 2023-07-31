import styled from "@emotion/styled";

export const ButtonCard = styled.button<{ status: "success" | "error" | "default"; isDragging: boolean }>`
  cursor: ${({ isDragging }) => (isDragging ? "grabbing" : "grab")};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 99;
  padding: ${({ theme }) => theme.spacing["spacing-12"]};
  gap: ${({ theme }) => theme.spacing["spacing-4"]};
  border-radius: ${({ theme }) => theme.radius["radius-8"]};
  border: 1px solid
    ${({ theme, status }) =>
      status === "success"
        ? theme.colors["support-success"][4]
        : status === "error"
        ? theme.colors["support-error"][3]
        : theme.colors["neutrals-01"][3]};
  background-color: ${({ theme }) => theme.colors["neutrals-01"][0]};
  width: 286px;
  appearance: none;
  outline: none;
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
  box-shadow: ${({ theme, isDragging }) => isDragging && theme.shadows["elevation-big"]};

  > div svg {
    color: ${({ theme, status }) =>
      status === "success"
        ? theme.colors["support-success"][4]
        : status === "error"
        ? theme.colors["support-error"][3]
        : theme.colors["neutrals-01"][7]};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors["neutrals-01"][4]};
    background-color: ${({ theme }) => theme.colors["neutrals-01"][1]};

    svg {
      color: ${({ theme, status }) => status === "default" && theme.colors["neutrals-02"][1]};
    }
  }

  &:active {
    border-color: ${({ theme }) => theme.colors["neutrals-02"][1]};
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
