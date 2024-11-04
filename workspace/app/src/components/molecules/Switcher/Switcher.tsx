import { colooors } from "@/constants/styles/colors";
import { spaciiing } from "@/constants/styles/spacing";

import {
  type CSSObject, type Styles, Tabs, type TabsProps, type TabsStylesNames, type TabsStylesParams
} from "@mantine/core";
import { useMantineTheme } from "@mantine/styles";
import { type FC } from "react";

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
  const theme = useMantineTheme();

  const styles: Styles<TabsStylesNames, TabsStylesParams> = () => ({
    panel: {
      fontFamily: "inherit",
      ...panelStyleOverwrite,
    },
    root: {},

    tab: {
      ...theme.fn.focusStyles(),
      "&:active": {
        backgroundColor: colooors["neutrals-01"][2],
      },
      "&:focus": {
        backgroundColor: colooors["neutrals-01"][1],
      },
      "&:hover": {
        backgroundColor: colooors["neutrals-01"][1],
      },
      "&[data-active]": {
        backgroundColor: colooors["neutrals-01"][1],
      },
      alignItems: "center",
      backgroundColor: "transparent",
      border: "none",
      borderRadius: theme.radius["radius-20"],
      color: colooors["neutrals-02"][1],
      cursor: "pointer",
      display: "flex",
      fontFamily: "inherit",
      fontSize: "16px",
      fontWeight: 500,
      gap: spaciiing["spacing-4"],
      justifyContent: "center",

      lineHeight: "24px",

      outline: "none",

      padding:
        size === "big"
          ? `${spaciiing["spacing-8"]} ${spaciiing["spacing-16"]}`
          : `${spaciiing["spacing-4"]} ${spaciiing["spacing-12"]}`,

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
      backgroundColor: colooors["neutrals-01"][4],
      borderRadius: theme.radius.full,
      display: "flex",
      justifyContent: "space-between",
      padding: spaciiing["spacing-4"],
    },
  });

  return (
    <Tabs unstyled styles={styles} {...props}>
      {children}
    </Tabs>
  );
};
