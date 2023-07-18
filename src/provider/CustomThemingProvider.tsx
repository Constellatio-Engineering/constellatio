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
          default: "0px 8px 32px 0px rgba(0, 0, 0, 0.08)",
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
