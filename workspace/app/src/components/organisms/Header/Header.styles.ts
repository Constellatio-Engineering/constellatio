import { colooors } from "@/constants/styles/colors";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

const SimpleHeader = css`
  justify-content: center;
`;

const DefaultHeader = css`
  justify-content: space-between;
`;

export const headerHeightPx = 60;

export const wrapper = ({ variant }: {
  variant: "default" | "simple" | "relative";
}) => css`
  height: ${headerHeightPx}px;
  display: flex;
  align-items: center;
  ${variant === "simple" ? SimpleHeader : DefaultHeader}
`;

export const SHeader = styled.header<{ withShadow?: boolean }>`
  background: #fff;
  position: fixed;
  top: 0;
  width: 100%;
  left: 0;
  z-index: 40;
  box-shadow: 0 2px 6px rgba(0, 0, 0, ${props => (props.withShadow ? "0.1" : "0")});
`;

export const links = css`
  display: flex;
  gap: 16px;
  height: 100%;
  align-items: center;
  margin-right: 24px;
  img {
    margin-right: 40px;
  }
  span {
  }
  a {
    color: black;
  }
  @media screen and (max-width: 1100px) {
    img {
      margin-right: 8px;
    }
  }
`;
export const SHeaderRelative = styled.header`
  background: #fff;
  width: 100%;
  height: 60px;
  min-height: 60px;
  z-index: 40;
  display: grid;
  place-items: center;
`;
export const linksRelative = css`
  display: flex;
  gap: 16px;
  height: 100%;
  align-items: center;

  span {
  }
  a {
    color: black;
  }
`;

export const profileArea = () => css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  position: relative;

  .vertical-line {
    background-color: ${colooors["neutrals-01"][3]};
    color: ${colooors["neutrals-01"][3]};
    height: 100%;
    position: relative;
    width: 2px;
    overflow: hidden;
  }
`;
export const tabletHeaderLogo = css`
  display: none;
  @media screen and (max-width: 1100px) {
    display: block;
  }
`;
export const headerLogo = css`
  width: 140px;
  height: auto;
  display: block;
  transform: translateY(4px);
  @media screen and (max-width: 1100px) {
    display: none;
  }
`;
