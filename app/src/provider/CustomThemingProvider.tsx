import { colors } from "@/constants/styles/colors";
import { radius } from "@/constants/styles/radius";
import { spacing } from "@/constants/styles/spacing";

import {
  MantineProvider, type MantineTheme, type ScrollAreaStylesNames, type ScrollAreaStylesParams, type Styles 
} from "@mantine/core";
import React, { type FunctionComponent, type ReactNode } from "react";

interface Props
{
  readonly children: ReactNode;
}

const CustomThemingProvider: FunctionComponent<Props> = ({ children }) =>
{
  const scrollAreaStyles: Styles<ScrollAreaStylesNames, ScrollAreaStylesParams> = (theme: MantineTheme) => ({
    scrollbar: {
      backgroundColor: theme.colors["neutrals-01"][0],
    },
    thumb: {
      backgroundColor: theme.colors["neutrals-01"][4],
      borderRadius: theme.radius.full,
    },
  });

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "light",
        colors: colors as any,
        components: {
          ScrollArea: {
            styles: scrollAreaStyles,
          },
        },
        fontFamily: "Karla, sans-serif",
        fontSizes: spacing,
        headings: {
          fontFamily: "Libre Baskerville, serif",
          sizes: {
            h1: {
              fontSize: "44px",
              fontWeight: 700,
              lineHeight: "68px",
            },
            h2: {
              fontSize: "28px",
              fontWeight: 700,
              lineHeight: "40px",
            },
            h3: {
              fontSize: "24px",
              fontWeight: 400,
              lineHeight: "36px",
            },
            h4: {
              fontSize: "18px",
              fontWeight: 400,
              lineHeight: "24px",
            },
          },
        },
        radius,
        shadows: {
          "elevation-big": "0px 8px 44px 0px rgba(0, 0, 0, 0.04)",
          "elevation-medium": "0px 8px 24px 0px rgba(0, 0, 0, 0.06)",
          "shadow-dark": "0px 4px 8px 0px rgba(0, 0, 0, 0.25)",
        },
        spacing,
      }}>
      {children}
    </MantineProvider>
  );
};

export default CustomThemingProvider;
