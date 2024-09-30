import { colooors } from "@/constants/styles/colors";
import { type UnknownMantineStylesParams } from "@/utils/types";

import { css } from "@emotion/react";
import { type DrawerStylesNames } from "@mantine/core";
import { type MantineTheme, type Styles } from "@mantine/styles";

type DrawerStylesProps = Styles<DrawerStylesNames, UnknownMantineStylesParams>;

export const drawerStyles = () =>
{
  const styles: DrawerStylesProps = (theme: MantineTheme) => ({
    body: {
      ".form": {
        position: "relative"
      },
      alignItems: "flex-start",
      display: "flex",
      flexDirection: "column",
      height: "calc(100vh - 77px)",
      justifyContent: "space-between",
      // marginTop: "24px",
      padding: "24px 0 0 0",
      width: "100%",
    },
    content: {
      background: colooors["neutrals-01"][1],
    },
    header: {
      padding: "0px",
    },
    title: {
      width: "100%",
    }
  });
  return styles;
};

export const contentWrapper = css`
  width: 100%;
`;

export const ctaWrapper = css`
  align-items: flex-start;
  background: ${colooors["neutrals-01"][0]};
  button {
    flex: 1;
  }
  display: flex;
  gap: 12px;
  justify-content: space-between;
  padding: 24px;
  text-align: center;
  width: 100%;
  border-top: 1px solid #F0F0F0;
`;
