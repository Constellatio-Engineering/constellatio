import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Column = styled.div<{
  readonly isDraggingOver: boolean;
}>`
  min-height: 250px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing["spacing-8"]};
  padding: ${({ theme }) => theme.spacing["spacing-12"]};
  padding-bottom: 4px;
  flex: 1 0 0;
  border-radius: ${({ theme }) => theme.radius["radius-12"]};
  border: 1px solid ${({ isDraggingOver, theme }) => isDraggingOver ? theme.colors["neutrals-01"][5] : theme.colors["neutrals-01"][3]};
  background-color: ${({ theme }) => theme.colors["neutrals-01"][2]};
`;

export const InnerWrapperWithBackground = css`
  background-image: url("/images/icons/linedBackground.svg");
  background-size: cover;
  background-position: center center;
`;

export const EmptyPlaceholder = styled.div`
  height: 100%;
  user-select: none;
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing["spacing-8"]};
  color: ${({ theme }) => theme.colors["neutrals-01"][7]};
`;
