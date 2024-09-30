import { type UnknownMantineStylesParams } from "@/utils/types";

import styled from "@emotion/styled";
import { type MantineTheme, type Styles } from "@mantine/core";
import { type RichTextEditorStylesNames } from "@mantine/tiptap";

type RichtextEditorFieldStyles = Styles<RichTextEditorStylesNames, UnknownMantineStylesParams>;

export const richtextEditorFieldStyles = (): RichtextEditorFieldStyles =>
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
        minHeight: "370px",
        overflow: "auto",
        padding: "20px",
        paddingBottom: "32px",
        whiteSpace: "normal",
        wordBreak: "break-word",
      },
    },
    root: {
      background: `${colooors["neutrals-01"][0]}`,
      borderRadius: "12px",
      overflow: "hidden"
    },
  });
  return styles;
};

export const ContentWrapper = styled.div`
`;
