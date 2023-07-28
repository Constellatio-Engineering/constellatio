import { colors } from "@/constants/styles/colors";
import { spacing } from "@/constants/styles/spacing";
import { css } from "@emotion/react";
import { CSSObject, MantineTheme, SpoilerStylesNames, SpoilerStylesParams, Styles } from "@mantine/core";

export const RichTextStyles = css`
  color: ${colors["neutrals-01"][9]};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    padding-bottom: ${spacing["spacing-8"]};
  }

  p {
    padding-bottom: ${spacing["spacing-4"]};
  }
`;

export const spoilerStyles = ({ isContentHide }: { isContentHide: boolean }) => {
  const styles: Styles<SpoilerStylesNames, SpoilerStylesParams> = (theme: MantineTheme) => ({
    root: {
      ":before": {
        content: "''",
        width: "100%",
        height: "100px",
        display: isContentHide ? "block" : "none",
        position: "absolute",
        bottom: 0,
        background: isContentHide
          ? "linear-gradient(360deg, #fff  64%, rgba(255, 255, 255, 0) 100%)"
          : "transparent",
      },
    },
    control: {
      marginTop: isContentHide ? -4 : theme.spacing["spacing-22"],
    }
  });

  return styles;
};

export const calloutStyles = () => {
  const styles = (theme: MantineTheme): CSSObject => ({
    backgroundColor: theme.colors["neutrals-01"][0],
    borderRadius: theme.radius["radius-12"],
    padding: theme.spacing["spacing-24"],
    borderTop: `8px solid ${theme.colors["support-warning"][2]}`,
  });
  return styles;
};
