import { colooors } from "@/constants/styles/colors";
import { radius } from "@/constants/styles/radius";
import { spacing } from "@/constants/styles/spacing";
import { globalStyles } from "@/styles/globals.style";
import { resetStyles } from "@/styles/resets.style";

import { Global } from "@emotion/react";
import {
  MantineProvider, type ScrollAreaStylesNames, type ScrollAreaStylesParams, type Styles
} from "@mantine/core";
import { type DeepPartial } from "@mantine/styles/lib/theme/types/DeepPartial";
import { Karla, Libre_Baskerville } from "next/font/google";
import React, { type FunctionComponent, type ReactNode } from "react";

import { type ExtendedCustomColors } from "../../types/mantine";

const karlaFont = Karla({
  style: ["normal", "italic"],
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const libreBaskervilleFont = Libre_Baskerville({
  style: ["normal", "italic"],
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface Props
{
  readonly children: ReactNode;
}

const CustomThemingProvider: FunctionComponent<Props> = ({ children }) =>
{
  const scrollAreaStyles: Styles<ScrollAreaStylesNames, ScrollAreaStylesParams> = theme => ({
    scrollbar: {
      backgroundColor: colooors["neutrals-01"][0],
    },
    thumb: {
      backgroundColor: colooors["neutrals-01"][4],
      borderRadius: theme.radius.full,
    },
  });

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "light",
        colors: colors as unknown as DeepPartial<Record<ExtendedCustomColors, [string, string, string, string, string, string, string, string, string, string]>>,
        components: {
          ScrollArea: {
            styles: scrollAreaStyles,
          },
        },
        fontFamily: karlaFont.style?.fontFamily + ", sans-serif",
        fontSizes: spacing,
        headings: {
          fontFamily: libreBaskervilleFont.style?.fontFamily + ", serif",
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
      <Global styles={[resetStyles, globalStyles]}/>
      {children}
    </MantineProvider>
  );
};

export default CustomThemingProvider;
