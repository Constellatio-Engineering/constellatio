import { CSSObject, MantineTheme, Styles, Tabs, TabsProps, TabsStylesNames, TabsStylesParams } from "@mantine/core";
import React, { FC } from "react";

type TSwitcher = TabsProps & {
  panelStyleOverwrite?: CSSObject | undefined;
  size: "big" | "medium";
  tabStyleOverwrite?: CSSObject | undefined;
};

export const Switcher: FC<TSwitcher> = ({
  size = "big",
  panelStyleOverwrite,
  tabStyleOverwrite,
  children,
  ...props
}) => {
  const styles: Styles<TabsStylesNames, TabsStylesParams> = (theme: MantineTheme) => ({
    root: {},
    tab: {
      ...theme.fn.focusStyles(),
      padding:
        size === "big"
          ? `${theme.spacing["spacing-8"]} ${theme.spacing["spacing-16"]}`
          : `${theme.spacing["spacing-4"]} ${theme.spacing["spacing-12"]}`,
      borderRadius: theme.radius["radius-20"],
      border: "none",
      outline: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing["spacing-4"],
      backgroundColor: "transparent",
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: "24px",
      fontFamily: "inherit",
      color: theme.colors["neutrals-02"][1],
      transition: "all 0.3s ease",

      "&:hover": {
        backgroundColor: theme.colors["neutrals-01"][1],
      },

      "&:active": {
        backgroundColor: theme.colors["neutrals-01"][2],
      },

      "&:focus": {
        backgroundColor: theme.colors["neutrals-01"][1],
      },

      "&[data-active]": {
        backgroundColor: theme.colors["neutrals-01"][1],
      },

      ...tabStyleOverwrite,
    },

    tabIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    tabsList: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing["spacing-4"],
      borderRadius: theme.radius.full,
      backgroundColor: theme.colors["neutrals-01"][4],
    },

    panel: {
      fontFamily: "inherit",
      ...panelStyleOverwrite,
    },

    tabLabel: {},
  });

  return (
    <Tabs unstyled styles={styles} {...props}>
      {children}
    </Tabs>
  );
};
