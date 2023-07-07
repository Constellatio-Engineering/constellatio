import { colors } from "@/constants/styles/colors";
import { radius } from "@/constants/styles/radius";
import { spacing } from "@/constants/styles/spacing";
import { MantineProvider } from "@mantine/core";
import React, { ReactNode } from "react";

const CustomThemingProvider = ({ children }: { children: ReactNode }) => (
  <MantineProvider
    withGlobalStyles
    withNormalizeCSS
    theme={{
      colorScheme: "light",
      fontFamily: "Karla, sans-serif",
      headings: {
        fontFamily: "Libre Baskerville, serif",
        fontWeight: 700,
        sizes: {
          h1: {
            fontSize: "44px",
            lineHeight: "68px",
          },
          h2: {
            fontSize: "28px",
            lineHeight: "40px",
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
    }}
  >
    {children}
  </MantineProvider>
);

export default CustomThemingProvider;
