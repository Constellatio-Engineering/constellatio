import { type UnknownMantineStylesParams } from "@/utils/types";

import { css } from "@emotion/react";
import {
  type MenuStylesNames,
  type MantineTheme,
  type Styles,
} from "@mantine/core";

type MenuStyles = Styles<MenuStylesNames, UnknownMantineStylesParams>;

export const menuStyles = (): MenuStyles => 
{
  const styles: MenuStyles = (theme: MantineTheme) => ({
    ".target": {
      outline: "1px solid red",
    },
    dropdown: {
      minWidth: "292px",
      overflow: "hidden",
      padding: "0px 0px !important",
    },
    item: {
      borderBottom: `1px solid ${theme.colors["neutrals-01"][3]}`,
      borderRadius: 0,
      padding: "12px 16px",
    },
  });
  return styles;
};

export const menuItem = (theme: MantineTheme) => css`
  .user-info {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;
    img {
      border-radius: 50%;
    }
    p {
      color: ${theme.colors["neutrals-01"][7]};
    }
  }
`;
export const target = (theme: MantineTheme) => css`
cursor: pointer;
  img {
    border-radius: 50%;
    border: 3px solid ${theme.colors["neutrals-01"][0]};
    outline: 1px solid ${theme.colors["neutrals-01"][3]};
    width: 36px;
    height: 36px;
  }
`;
