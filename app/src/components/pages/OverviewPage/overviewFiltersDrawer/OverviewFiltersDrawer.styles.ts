import type { UnknownMantineStylesParams } from "@/utils/types";

import { css } from "@emotion/react";
import type { DrawerStylesNames } from "@mantine/core";
import type { MantineTheme, Styles } from "@mantine/styles";

type DrawerStylesProps = Styles<DrawerStylesNames, UnknownMantineStylesParams>;

export const drawerStyles = () =>
{
  const styles: DrawerStylesProps = (theme: MantineTheme) => ({
    body: {
      ".form": {
        position: "relative"
      },

      minHeight: "90vh",
      padding: "0px"

    },
    content: {
      background: theme.colors["neutrals-01"][1],
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
