import { colors } from "@/constants/styles/colors";
import { type UnknownMantineStylesParams } from "@/utils/types";

import { css } from "@emotion/react";
import { type MantineTheme, type Styles } from "@mantine/core";
import { type RichTextEditorStylesNames } from "@mantine/tiptap";

type RichtextEditorFieldStyles = Styles<RichTextEditorStylesNames, UnknownMantineStylesParams>;

export const richtextEditorFieldStyles = ({ hasError, minHeight }: { hasError: boolean; minHeight: number}): RichtextEditorFieldStyles =>
{
  const styles: RichtextEditorFieldStyles = (theme: MantineTheme) => ({
    content: {
      "& .ProseMirror": {
        "& blockquote": {
          "&:before": {
            backgroundImage: "url(\"/images/icons/quote-icon.svg\")",
            backgroundRepeat: "no-repeat",
            content: "''",
            display: "block",
            height: "20px",
            width: "20px",
          },
          backgroundColor: theme.colors["neutrals-01"][1],
          border: `1px solid ${theme.colors["neutrals-01"][3]}`,
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          justifyContent: "center",
          padding: "20px",
          position: "relative",
        },
        maxHeight: "60vh",
        minHeight: `${minHeight}px`,
        padding: "20px",
        paddingBottom: "32px",
        whiteSpace: "normal",
        wordBreak: "break-word",
      },
    },
    root: {
      background: `${theme.colors["neutrals-01"][0]}`,
      ...(hasError && {
        borderColor: colors["support-error"][3],
      }),
      borderRadius: "12px",
      overflow: "hidden"
    },
  });
  return styles;
};

export const contentWrapper = css`
  overflow: auto;
`;

export const wrapper = css`
  width: 100%;
  scroll-margin: 20vh !important;
`;

export const label = (hasError: boolean) => css`
  color: blue;
  display: block;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  color: ${hasError ? colors["support-error"][3] : "#212529"};
  padding-bottom: 4px;
`;

export const error = css`
  margin-top: 8px;
  font-weight: 500;
  color: ${colors["support-error"][3]};
  font-size: 14px;
`;
