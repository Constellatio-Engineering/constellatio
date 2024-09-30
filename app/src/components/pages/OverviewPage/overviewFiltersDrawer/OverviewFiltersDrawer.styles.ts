import type { UnknownMantineStylesParams } from "@/utils/types";

import type { DrawerStylesNames } from "@mantine/core";
import type { MantineTheme, Styles } from "@mantine/styles";

type DrawerStylesProps = Styles<DrawerStylesNames, UnknownMantineStylesParams>;

export const drawerStyles = () =>
{
  const styles: DrawerStylesProps = (theme: MantineTheme) => ({
    body: {
      overflowY: "auto",
      padding: "0px",
      paddingBottom: 40
    },
    content: {
      background: colooors["neutrals-01"][0],
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
