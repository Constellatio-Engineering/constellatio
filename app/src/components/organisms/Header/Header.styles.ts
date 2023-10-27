import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { type MantineTheme } from "@mantine/styles";

const SimpleHeader = css`
  justify-content: center;
`;

const DefaultHeader = css`
  justify-content: space-between;
`;

export const headerHeightPx = 60;

export const wrapper = ({ theme, variant }: {
  theme: MantineTheme;
  variant: "default" | "simple" | "relative";
}) => css`
  height: ${headerHeightPx}px;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 0 ${theme.spacing["spacing-24"]};
  ${variant === "simple" ? SimpleHeader : DefaultHeader}
`;

export const SHeader = styled.header`
  background: #fff;
  position: fixed;
  top: 0;
  width: 100%;
  left: 0;
  z-index: 40;
`;
export const links = css`
  display: flex;
  gap: 16px;
  height: 100%;
  align-items: center;
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

export const profileArea = (theme: MantineTheme) => css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  position: relative;

  .vertical-line {
    background-color: ${theme.colors["neutrals-01"][3]};
    color: ${theme.colors["neutrals-01"][3]};
    height: 100%;
    position: relative;
    width: 2px;
    overflow: hidden;
  }
`;
