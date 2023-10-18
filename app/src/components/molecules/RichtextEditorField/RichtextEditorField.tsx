import { Button } from "@/components/atoms/Button/Button";
import { Check } from "@/components/Icons/Check";

import { RichTextEditor, Link } from "@mantine/tiptap";
import { Placeholder } from "@tiptap/extension-placeholder";
import { type Content, useEditor, type Editor, type EditorEvents } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import React, { type FC, useEffect } from "react";

import { ContentWrapper, richtextEditorFieldStyles } from "./RichtextEditorField.styles";

export interface RichtextEditorFieldProps
{
  readonly action?: (editor: Editor) => void;
  readonly button?: {
    text?: string;
  };
  readonly content?: Content;
  readonly disabled?: boolean;
  readonly onChange?: (e: EditorEvents["update"]) => void;
  readonly variant: "simple" | "with-legal-quote";
}

export const RichtextEditorField: FC<RichtextEditorFieldProps> = ({
  action,
  button,
  content = "",
  disabled,
  onChange,
  variant
}) =>
{
  const editor = useEditor({
    content,
    editable: !disabled,
    extensions: [
      StarterKit,
      Link,
      Placeholder.configure({
        placeholder: `${variant === "simple" ? "Enter your case solution here..." : "Start typing here..."} `,
      }),
    ],
    onUpdate: (e) =>
    {
      if(onChange)
      {
        onChange(e);
      }
    },
  });

  const handleSubmit = (): void => 
  {
    if(action && editor) { action(editor); }
  };

  useEffect(() =>
  {
    if(!editor)
    {
      return;
    }

    editor.setOptions({ editable: !disabled });
  }, [disabled, editor]);

  return (
    <RichTextEditor
      editor={editor}
      styles={richtextEditorFieldStyles()}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold/>
          <RichTextEditor.Italic/>
        </RichTextEditor.ControlsGroup>
        <span className="control-group-separator"/>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.BulletList/>
          <RichTextEditor.OrderedList/>
        </RichTextEditor.ControlsGroup>
        {variant === "with-legal-quote" && (
          <RichTextEditor.ControlsGroup className="blockquote-control">
            <RichTextEditor.Blockquote/>
          </RichTextEditor.ControlsGroup>
        )}
      </RichTextEditor.Toolbar>
      <ContentWrapper>
        <RichTextEditor.Content/>
        {button && (
          <div>
            <Button<"button">
              styleType="primary"
              size="large"
              type="button"
              onClick={handleSubmit}
              leftIcon={<Check/>}
              disabled={editor?.isEmpty}>
              {button?.text}
            </Button>
          </div>
        )}
      </ContentWrapper>
    </RichTextEditor>
  );
};
