import styled from "@emotion/styled";
import { MantineTheme, Styles } from "@mantine/core";
import { RichTextEditorStylesNames } from "@mantine/tiptap";

export const richtextEditorFieldStyles = ({}) => {
  const styles: Styles<RichTextEditorStylesNames, Record<string, any>> = (theme: MantineTheme) => ({
    content: {
      "& .ProseMirror": {
        padding: 0,
        paddingBottom: "32px",

        "> *": {
          fontSize: "16px",
          lineHeight: "24px",
          margin: "0",

          em: {
            fontStyle: "italic",
          },
          strong: {
            fontWeight: "bold",
          },
        },

        "& ul": {
          listStyle: "initial",
          padding: "20px",
        },

        "& ol": {
          listStyle: "decimal",
          padding: "20px",
        },

        "& blockquote": {
          "> *": {
            margin: "0",
          },

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "20px",
          gap: "8px",
          borderRadius: "12px",
          backgroundColor: theme.colors["neutrals-01"][1],
          border: `1px solid ${theme.colors["neutrals-01"][3]}`,
          position: "relative",

          "&:before": {
            content: "''",
            width: "20px",
            height: "20px",
            display: "block",
            backgroundImage: `url("/images/icons/quote-icon.svg")`,
            backgroundRepeat: "no-repeat",
          },
        },
      },
    },
    toolbar: {
      padding: "12px 16px",
      gap: "12px",
      backgroundColor: "transparent",

      "& .mantine-RichTextEditor-controlsGroup ": {
        alignItems: "center",
        gap: "8px",

        "& .mantine-RichTextEditor-control": {
          borderTopLeftRadius: "50% !important",
          borderTopRightRadius: "50% !important",
          borderBottomLeftRadius: "50% !important",
          borderBottomRightRadius: "50% !important",
          width: "32px",
          height: "32px",
          padding: "8px",
          border: `1px solid ${theme.colors["neutrals-01"][3]}`,
          transition: "background-color 0.3s ease, border-color 0.3 ease",

          "&:hover": {
            backgroundColor: theme.colors["neutrals-01"][2],
            borderColor: theme.colors["neutrals-01"][5],
          },

          "&[data-active]": {
            borderColor: theme.colors["neutrals-01"][5],
            backgroundColor: theme.colors["neutrals-01"][4],
            color: theme.colors["neutrals-02"][1],
          },

          "> svg": {
            minWidth: "16px",
          },
        },
      },

      "& .blockquote-control": {
        marginLeft: "auto",
      },

      "& .control-group-separator": {
        width: "1px",
        height: "16px",
        backgroundColor: theme.colors["neutrals-01"][5],
      },
    },
    root: {
      borderRadius: "12px",
      border: `1px solid ${theme.colors["neutrals-01"][5]}`,
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
