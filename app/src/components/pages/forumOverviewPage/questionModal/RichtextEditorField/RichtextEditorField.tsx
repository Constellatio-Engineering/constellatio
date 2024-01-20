import { RichTextEditor, Link } from "@mantine/tiptap";
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import { Placeholder } from "@tiptap/extension-placeholder";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Underline } from "@tiptap/extension-underline";
import { type Content, useEditor, type EditorEvents } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import React, { type FC } from "react";

import { ContentWrapper, richtextEditorFieldStyles } from "./RichtextEditorField.styles";

export interface RichtextEditorFieldProps
{
  readonly content: Content;
  readonly onChange: (e: EditorEvents["update"]) => void;
}

export const RichtextEditorField: FC<RichtextEditorFieldProps> = ({ content, onChange }) =>
{
  const editor = useEditor({
    content,
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
    onUpdate: onChange,
    parseOptions: {
      preserveWhitespace: true,
    }
  });

  return (
    <RichTextEditor
      editor={editor}
      styles={richtextEditorFieldStyles()}>
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
      <ContentWrapper>
        <RichTextEditor.Content/>
      </ContentWrapper>
    </RichTextEditor>
  );
};
