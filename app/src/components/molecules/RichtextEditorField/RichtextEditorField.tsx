import { Button, type TButton } from "@/components/atoms/Button/Button";

import { RichTextEditor, Link } from "@mantine/tiptap";
import { Placeholder } from "@tiptap/extension-placeholder";
import { type Content, useEditor, type Editor, type EditorEvents } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import React, { type FC, useEffect } from "react";

import { ContentWrapper, richtextEditorFieldStyles } from "./RichtextEditorField.styles";

type RichtextEditorButton = {
  readonly action: (editor: Editor) => void;
  readonly props: TButton;
  readonly text: string;
};

export interface RichtextEditorFieldProps
{
  readonly buttons?: RichtextEditorButton[];
  readonly content: Content;
  readonly disabled?: boolean;
  readonly onChange?: (e: EditorEvents["update"]) => void;
  readonly variant: "simple" | "with-legal-quote";
}

export const RichtextEditorField: FC<RichtextEditorFieldProps> = ({
  buttons,
  content,
  disabled,
  onChange,
  variant,
}) =>
{
  const editor = useEditor({
    content,
    editable: !disabled,
    extensions: [
      StarterKit,
      Link,
      Placeholder.configure({
        placeholder: `${variant === "simple" ? "Gutachten verfassen..." : "Beginne hier..."} `,
      }),
    ],
    onUpdate: onChange,
    parseOptions: {
      preserveWhitespace: true,
    }
  });

  useEffect(() =>
  {
    if(editor)
    {
      editor.setOptions({ editable: !disabled });
    }
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
        {buttons && buttons.length > 0 && (
          <div style={{ alignItems: "center", display: "flex", gap: 8 }}>
            {buttons.map((button, index) => (
              <Button<"button">
                key={index}
                {...button?.props}
                type="button"
                onClick={() =>
                {
                  if(editor)
                  {
                    button?.action(editor);
                  }
                }}
                disabled={button.props.disabled || editor?.isEmpty}>
                {button?.text}
              </Button>
            ))}
          </div>
        )}
      </ContentWrapper>
    </RichTextEditor>
  );
};
