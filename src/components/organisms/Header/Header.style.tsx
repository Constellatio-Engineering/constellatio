import { css } from "@emotion/react";
import styled from "@emotion/styled";

const SimpleHeader = css`
  justify-content: center;
`;

const DefaultHeader = css`
  justify-content: space-between;
`;

export const SHeader = styled.header<{ variant: "default" | "simple" }>`
  height: 72px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing["spacing-24"]};
  background-color: transparent;
  position: sticky;
  top: 0;
  z-index: 40;
  background: white;
  ${({ variant }) => (variant === "simple" ? SimpleHeader : DefaultHeader)}
`;
