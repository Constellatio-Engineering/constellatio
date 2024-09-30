import { type UnknownMantineStylesParams } from "@/utils/types";

import { css } from "@emotion/react";
import {
  type InputStylesNames,
  type MantineTheme,
  type Styles,
} from "@mantine/core";

type InputStylesProps = Styles<InputStylesNames, UnknownMantineStylesParams>;

export const form = css`
  position: relative;
  z-index: 21;
`;

export const inputStyles = () =>
{
  const styles: InputStylesProps = (theme: MantineTheme) => ({
    icon: {
      color: colooors["neutrals-01"][7],
      left: "62px",
      width: "24px",
    },
    input: {
      "&::placeholder": {
        color: colooors["neutrals-01"][7],
      },
      backgroundColor: colooors["neutrals-01"][0],
      border: "none",
      borderRadius: "0px",
      fontFamily: `${theme.headings.fontFamily}`,
      fontSize: "24px",
      fontWeight: 400,
      height: "72px",
      lineHeight: "36px",
      padding: "0 0 0 100px !important"
    },
    wrapper: {
      borderBottom: `1px solid ${colooors["neutrals-01"][4]}`,
    },
  });

  return styles;
};

export const dropdown = css`
  border: none;
  border-top: 1px solid #e0e0e0;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.16);
  overflow: hidden;
  padding: 0;
`;

export const dropdownContentWrapper = css`
  max-height: 500px;
  overflow-y: auto;
  padding: 40px 60px;
`;

export const dropDownOverflowGradient = css`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 1)
  );
`;

export const searchResult = css`
  margin-bottom: 12px;
  position: relative;
  gap: 8px;
  :last-of-type {
    margin-bottom: 0;
  }
`;

export const searchResultLink = css`
  display: inline-block;
  color: inherit;
  line-height: 1.4;
`;

export const overflowOverlay = css`
  right: 0;
  top: 0;
  position: absolute;
  bottom: 0;
  z-index: 100;
  width: 16px;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 1)
  );
`;
