import { colooors } from "@/constants/styles/colors";
import { spaciiing } from "@/constants/styles/spacing";
import { type UnknownMantineStylesParams } from "@/utils/types";

import { type MantineTheme, type ModalStylesNames, type Styles } from "@mantine/core";

type ModalStyles = Styles<ModalStylesNames, UnknownMantineStylesParams>;

export const modalStyles = (theme: MantineTheme): ModalStyles =>
{
  const styles: ModalStyles = () => ({
    body: {
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      gap: spaciiing["spacing-24"],
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
      padding: spaciiing["spacing-36"],
    },
    header: {
      alignItems: "self-start",
      padding: `0 0 ${spaciiing["spacing-16"]} 0`,
    },
    overlay: {
      backgroundColor: colooors["transparency-01"][5],
    },
    title: {
      fontFamily: `${theme.fontFamily}`,
      fontSize: theme.fontSizes["spacing-24"],
      fontWeight: 400,
      lineHeight: spaciiing["spacing-36"],
    },
  });
  return styles;
};
