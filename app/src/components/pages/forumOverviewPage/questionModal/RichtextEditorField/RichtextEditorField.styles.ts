import { colooors } from "@/constants/styles/colors";
import { type UnknownMantineStylesParams } from "@/utils/types";

import { css } from "@emotion/react";
import { type MantineTheme, type Styles } from "@mantine/core";
import { type RichTextEditorStylesNames } from "@mantine/tiptap";

type RichtextEditorFieldStyles = Styles<RichTextEditorStylesNames, UnknownMantineStylesParams>;

export const richtextEditorFieldStyles = ({
  hasError,
  minHeight,
  noMinHeight
}: { hasError: boolean; minHeight: number; noMinHeight: boolean}): RichtextEditorFieldStyles =>
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
          backgroundColor: colooors["neutrals-01"][1],
          border: `1px solid ${colooors["neutrals-01"][3]}`,
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          justifyContent: "center",
          padding: "20px",
          position: "relative",
        },
        maxHeight: "60vh",
        minHeight: noMinHeight ? "unset" : `${minHeight}px`,
        overflow: "auto",
        padding: "20px",
        paddingBottom: "32px",
        whiteSpace: "normal",
        wordBreak: "break-word",
      },
    },
    root: {
      background: `${colooors["neutrals-01"][0]}`,
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
`;

export const wrapper = css`
  width: 100%;
  scroll-margin-top: 30vh !important;
  position: relative;
`;

export const wrapperLoading = css`
  min-height: 207px;
`;

export const buttonsWrapper = css`
  align-items: center;
  display: flex;
  gap: 12px;
  justify-content: flex-start;
  padding: 20px;
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
  color: ${colooors["support-error"][3]};
  font-size: 14px;
`;

export const loadingState = css`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 100%;
  background-color: red;
  z-index: 1;
  padding: 14px;
  background-color: rgba(255, 255, 255, 0.8);
`;
