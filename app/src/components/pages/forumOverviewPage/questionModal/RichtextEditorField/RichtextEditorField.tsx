import type { PostQuestionSchema } from "@/schemas/forum/postQuestion.schema";

import { type GetInputProps } from "@mantine/form/lib/types";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import { Placeholder } from "@tiptap/extension-placeholder";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Underline } from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import React, { type FunctionComponent, useEffect } from "react";

import * as styles from "./RichtextEditorField.styles";

interface Props extends ReturnType<GetInputProps<PostQuestionSchema>> 
{
  readonly label: string;
  readonly onChange: (value: PostQuestionSchema["question"]) => void;
  readonly value: PostQuestionSchema["question"];
}

export const RichtextEditorField: FunctionComponent<Props> = ({
  error,
  label,
  onBlur,
  onChange,
  onFocus,
  value
}) =>
{
  console.log("[RichtextEditorField] error", error);

  const editor = useEditor({
    content: value.html,
    extensions: [
      Link,
      StarterKit,
      Underline,
      TextStyle,
      Highlight,
      Color,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({
        placeholder: "Beginne hier...",
      }),
    ],
    onUpdate: (props) => onChange({
      html: props.editor.getHTML(),
      text: props.editor.getText().trim(),
    }),
    parseOptions: {
      preserveWhitespace: true,
    }
  });

  return (
    <div css={styles.wrapper}>
      <p css={styles.label(error != null)}>
        {label}
      </p>
      <RichTextEditor
        editor={editor}
        onBlur={onBlur}
        onFocus={onFocus}
        styles={styles.richtextEditorFieldStyles(error != null)}>
        <RichTextEditor.Toolbar>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold/>
            <RichTextEditor.Italic/>
            <RichTextEditor.Underline/>
            <RichTextEditor.Strikethrough/>
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link/>
            <RichTextEditor.Unlink/>
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote/>
            <RichTextEditor.BulletList/>
            <RichTextEditor.OrderedList/>
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>
        <div css={styles.contentWrapper}>
          <RichTextEditor.Content/>
        </div>
      </RichTextEditor>
      {error && (
        <p css={styles.error}>{error}</p>
      )}
    </div>
  );
};
