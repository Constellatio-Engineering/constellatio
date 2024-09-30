import { colooors } from "@/constants/styles/colors";
import { spaciiing } from "@/constants/styles/spacing";

import styled from "@emotion/styled";

export const Card = styled.div<{ dropped?: boolean; status: "success" | "error" | "default" }>`
    display: flex;
    align-items: center;
    cursor: ${({ dropped }) => (dropped ? "default" : "grab")}
    user-select: none;
    justify-content: space-between;
    padding: ${spaciiing["spacing-12"]};
    gap: ${spaciiing["spacing-4"]};
    border-radius: ${({ theme }) => theme.radius["radius-8"]};
    border: 1px solid ${({ dropped, status }) =>
    dropped
      ? status === "success"
        ? colooors["support-success"][4]
        : status === "error"
          ? colooors["support-error"][3]
          : colooors["neutrals-01"][3]
      : status === "success"
        ? colooors["support-error"][3]
        : colooors["neutrals-01"][3]};

    background-color: ${colooors["neutrals-01"][0]};
    width: 100%;
    appearance: none;
    outline: none;
    transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
  margin-bottom: 8px;
  
    > div svg {
        color: ${colooors["neutrals-01"][7]};
    }

    &:hover {
        border-color: ${({ status }) => status === "default" && colooors["neutrals-01"][4]};
        background-color: ${({ status }) => status === "default" && colooors["neutrals-01"][1]};

        svg {
            color: ${({ status }) => status === "default" && colooors["neutrals-02"][1]};
        }
    }

    &:active {
        border-color: #d4d4d4;
        background-color: ${colooors["neutrals-01"][1]};
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
  color: ${colooors["neutrals-01"][7]};
  align-items: center;
  position: relative;
  gap: ${spaciiing["spacing-8"]};
`;

export const WarningWrapper = styled.div`
  background-color: #fff7ec;
  padding: 6px;
  position: absolute;
  cursor: pointer;
  border-radius: 8px;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 2px;

  svg path {
    fill: #fd8e00;
  }
`;
