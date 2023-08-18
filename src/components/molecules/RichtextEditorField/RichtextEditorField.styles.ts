import styled from "@emotion/styled";
import { Styles } from "@mantine/core";
import { RichTextEditorStylesNames } from "@mantine/tiptap";

export const richtextEditorFieldStyles = ({}) => {
  const styles: Styles<RichTextEditorStylesNames, Record<string, any>> = () => ({
    content: {
      "& .ProseMirror": {
        padding: 0,

        "> *": {
          fontSize: "16px",
          lineHeight: "24px",

          em: {
            fontStyle: "italic",
          },
          strong: {
            fontWeight: "bold",
          },
        },
        "& ul": {
          listStyle: "initial",
        },
        "& ol": {
          listStyle: "decimal",
        },
      },
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
  
`;
