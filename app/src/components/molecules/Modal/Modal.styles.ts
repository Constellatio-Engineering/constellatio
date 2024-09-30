import { type UnknownMantineStylesParams } from "@/utils/types";

import { type MantineTheme, type ModalStylesNames, type Styles } from "@mantine/core";

type ModalStyles = Styles<ModalStylesNames, UnknownMantineStylesParams>;

export const modalStyles = (): ModalStyles =>
{
  const styles: ModalStyles = (theme: MantineTheme) => ({
    body: {
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing["spacing-24"],
      justifyContent: "center",
      padding: 0,
    },
    close: {
      height: "32px",
      svg: {
        color: colooors["neutrals-02"][1],
        height: "26px !important",
        width: "26px !important",
      },
      width: "32px",
    },
    content: {
      borderRadius: theme.radius["radius-12"],
      boxShadow: theme.shadows["elevation-big"],
      padding: theme.spacing["spacing-36"],
    },
    header: {
      alignItems: "self-start",
      padding: `0 0 ${theme.spacing["spacing-16"]} 0`,
    },
    overlay: {
      backgroundColor: colooors["transparency-01"][5],
    },
    title: {
      fontFamily: `${theme.fontFamily}`,
      fontSize: theme.fontSizes["spacing-24"],
      fontWeight: 400,
      lineHeight: theme.spacing["spacing-36"],
    },
  });
  return styles;
};
