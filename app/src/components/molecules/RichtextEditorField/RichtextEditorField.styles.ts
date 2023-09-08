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

          "> *": {
            margin: "0",
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
        "& ol": {
          listStyle: "decimal",
          padding: "20px",
        },

        "& ul": {
          listStyle: "initial",
          padding: "20px",
        },

        "> *": {
          em: {
            fontStyle: "italic",
          },
          fontSize: "16px",
          lineHeight: "24px",

          margin: "0",
          strong: {
            fontWeight: "bold",
          },
        },

        padding: 0,

        paddingBottom: "32px",
      },
    },
    root: {
      background: `${theme.colors["neutrals-01"][0]}`,
      border: `1px solid ${theme.colors["neutrals-01"][5]}`,
      borderRadius: "12px"
    },
    toolbar: {
      "& .blockquote-control": {
        marginLeft: "auto",
      },
      "& .control-group-separator": {
        backgroundColor: theme.colors["neutrals-01"][5],
        height: "16px",
        width: "1px",
      },
      "& .mantine-RichTextEditor-controlsGroup ": {
        "& .mantine-RichTextEditor-control": {
          "&:hover": {
            backgroundColor: theme.colors["neutrals-01"][2],
            borderColor: theme.colors["neutrals-01"][5],
          },
          "&[data-active]": {
            backgroundColor: theme.colors["neutrals-01"][4],
            borderColor: theme.colors["neutrals-01"][5],
            color: theme.colors["neutrals-02"][1],
          },
          "> svg": {
            minWidth: "16px",
          },
          border: `1px solid ${theme.colors["neutrals-01"][3]}`,
          borderBottomLeftRadius: "50% !important",
          borderBottomRightRadius: "50% !important",
          borderTopLeftRadius: "50% !important",
          borderTopRightRadius: "50% !important",
          height: "32px",

          padding: "8px",

          transition: "background-color 0.3s ease, border-color 0.3 ease",

          width: "32px",
        },
        alignItems: "center",

        gap: "8px",
      },

      backgroundColor: "transparent",

      gap: "12px",

      padding: "12px 16px",
    },
  });
  return styles;
};

export const ContentWrapper = styled.div`
  min-height: 370px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;

  .mantine-RichTextEditor-typographyStylesProvider .mantine-RichTextEditor-content .ProseMirror {
    > blockquote {
    }
  }
`;
