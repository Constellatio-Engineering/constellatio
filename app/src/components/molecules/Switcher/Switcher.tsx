import {
  type CSSObject, type MantineTheme, type Styles, Tabs, type TabsProps, type TabsStylesNames, type TabsStylesParams 
} from "@mantine/core";
import React, { type FC } from "react";

export type SwitcherProps = TabsProps & {
  readonly panelStyleOverwrite?: CSSObject | undefined;
  readonly size: "big" | "medium";
  readonly tabStyleOverwrite?: CSSObject | undefined;
};

export const Switcher: FC<SwitcherProps> = ({
  children,
  panelStyleOverwrite,
  size = "big",
  tabStyleOverwrite,
  ...props
}) => 
{
  const styles: Styles<TabsStylesNames, TabsStylesParams> = (theme: MantineTheme) => ({
    panel: {
      fontFamily: "inherit",
      ...panelStyleOverwrite,
    },
    root: {},

    tab: {
      ...theme.fn.focusStyles(),
      "&:active": {
        backgroundColor: theme.colors["neutrals-01"][2],
      },
      "&:focus": {
        backgroundColor: theme.colors["neutrals-01"][1],
      },
      "&:hover": {
        backgroundColor: theme.colors["neutrals-01"][1],
      },
      "&[data-active]": {
        backgroundColor: theme.colors["neutrals-01"][1],
      },
      alignItems: "center",
      backgroundColor: "transparent",
      border: "none",
      borderRadius: theme.radius["radius-20"],
      color: theme.colors["neutrals-02"][1],
      cursor: "pointer",
      display: "flex",
      fontFamily: "inherit",
      fontSize: "16px",
      fontWeight: 500,
      gap: theme.spacing["spacing-4"],
      justifyContent: "center",

      lineHeight: "24px",

      outline: "none",

      padding:
        size === "big"
          ? `${theme.spacing["spacing-8"]} ${theme.spacing["spacing-16"]}`
          : `${theme.spacing["spacing-4"]} ${theme.spacing["spacing-12"]}`,

      transition: "all 0.3s ease",

      ...tabStyleOverwrite,
    },

    tabIcon: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
    },

    tabLabel: {},

    tabsList: {
      alignItems: "center",
      backgroundColor: theme.colors["neutrals-01"][4],
      borderRadius: theme.radius.full,
      display: "flex",
      justifyContent: "space-between",
      padding: theme.spacing["spacing-4"],
    },
  });

  return (
    <Tabs unstyled styles={styles} {...props}>
      {children}
    </Tabs>
  );
};
