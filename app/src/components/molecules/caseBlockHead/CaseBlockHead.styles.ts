import { type SerializedStyles, css } from "@emotion/react";
import { type MantineTheme } from "@mantine/styles";

export const wrapper = css`
  min-width: 230px;
  width: min-content;

  @media screen and (max-width: 1200px) {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    p {
      white-space: nowrap;
    }
  }
`;

export const detailText = (theme: MantineTheme): SerializedStyles => css`
  p {
    margin-top: 10px;
  }
  color: ${theme.colors["neutrals-01"][7]};
  @media screen and (max-width: 1200px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 10px;
    flex-direction: row-reverse;
    p {

      white-space: nowrap;
      margin: 0;
    }
    * {
      white-space: nowrap;
    }
  }
`;

export const iconWrapper = css`
  pointer-events: none;
  cursor: default;
`;

export const title = css`
  width: 100%;
  margin: 12px 0 24px 0;
  overflow: hidden;
  hyphens: auto;
  @media screen and (max-width: 1200px) {
    margin: 0 12px;
  }
`;
