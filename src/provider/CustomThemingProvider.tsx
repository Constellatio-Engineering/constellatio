import { colors } from "@/constants/styles/colors";
import { radius } from "@/constants/styles/radius";
import { spacing } from "@/constants/styles/spacing";
import { MantineProvider, MantineTheme, ScrollAreaStylesNames, ScrollAreaStylesParams, Styles } from "@mantine/core";
import React, { ReactNode } from "react";

const CustomThemingProvider = ({ children }: { children: ReactNode }) => {
  const scrollAreaStyles: Styles<ScrollAreaStylesNames, ScrollAreaStylesParams> = (theme: MantineTheme) => ({
    scrollbar: {
      backgroundColor: theme.colors["neutrals-01"][0],
    },
    thumb: {
      borderRadius: theme.radius["full"],
      backgroundColor: theme.colors["neutrals-01"][4],
    },
  });

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "light",
        fontFamily: "Karla, sans-serif",
        headings: {
          fontFamily: "Libre Baskerville, serif",
          sizes: {
            h1: {
              fontSize: "44px",
              lineHeight: "68px",
              fontWeight: 700,
            },
            h2: {
              fontSize: "28px",
              lineHeight: "40px",
              fontWeight: 700,
            },
            h3: {
              fontSize: "24px",
              lineHeight: "36px",
              fontWeight: 400,
            },
            h4: {
              fontSize: "18px",
              lineHeight: "24px",
              fontWeight: 400,
            },
          },
        },
        colors: colors as any,
        shadows: {
          "elevation-big": "0px 8px 44px 0px rgba(0, 0, 0, 0.04)",
          "elevation-medium": "0px 8px 24px 0px rgba(0, 0, 0, 0.06)",
          "shadow-dark": "0px 4px 8px 0px rgba(0, 0, 0, 0.25)",
        },
        radius,
        spacing,
        fontSizes: spacing,
        components: {
          ScrollArea: {
            styles: scrollAreaStyles,
          },
        },
      }}
    >
      {children}
    </MantineProvider>
  );
};

export default CustomThemingProvider;
