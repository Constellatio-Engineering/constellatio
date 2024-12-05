import { colooors } from "@/constants/styles/colors";
import type { UnknownMantineStylesParams } from "@/utils/types";

import { css } from "@emotion/react";
import { type Styles, type DrawerStylesNames } from "@mantine/core";

type DrawerStylesProps = Styles<DrawerStylesNames, UnknownMantineStylesParams>;

export const drawerStyles = () =>
{
  const styles: DrawerStylesProps = () => ({
    body: {
      alignItems: "flex-start",
      display: "flex",
      flexDirection: "column",
      height: "calc(100vh - 77px)",
      justifyContent: "space-between",
      padding: "24px 0 0 0",
      width: "100%",
    },
    content: {
      backgroundColor: colooors["neutrals-01"][1],
      transform: "none !important",
    },
    header: {
      padding: 0,
    },
    title: {
      width: "100%",
    }
  });
  return styles;
};

export const contentWrapper = css`
  width: 100%;
  max-width: 720px;
  padding: 50px 36px;
  padding-bottom: 0;
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

export const richTextWrapper = css`
  width: 100%;
`;

export const gameWrapper = css`
  margin: 36px 0;
`;
