import { MantineTheme, ModalStylesNames, Styles } from "@mantine/core";

export const modalStyles = () => {
  const styles: Styles<ModalStylesNames, Record<string, any>> = (theme: MantineTheme) => ({
    close: {
      width: "32px",
      height: "32px",
      svg: {
        width: "26px !important",
        height: "26px !important",
        color: theme.colors["neutrals-02"][1],
      },
    },
    header: {
      alignItems: "self-start",
      padding: 0,
    },
    body: {
      padding: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing["spacing-24"],
    },
    content: {
      padding: theme.spacing["spacing-36"],
      borderRadius: theme.radius["radius-8"],
      boxShadow: theme.shadows.default,
    },
  });
  return styles;
};
