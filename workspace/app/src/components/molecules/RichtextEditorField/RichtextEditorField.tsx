import { Button, type TButton } from "@/components/atoms/Button/Button";

import { Link, RichTextEditor } from "@mantine/tiptap";
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import { Placeholder } from "@tiptap/extension-placeholder";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Underline } from "@tiptap/extension-underline";
import { type Content, type Editor, type EditorEvents, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { type FC, useEffect } from "react";

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
  readonly onChange: (e: EditorEvents["update"]) => void;
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
      Link,
      StarterKit,
      Underline,
      Highlight,
      TextStyle,
      Color,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
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
          <RichTextEditor.Color color="#000000"/>
          <RichTextEditor.Color color="#F03E3E"/>
          <RichTextEditor.Color color="#1098AD"/>
          <RichTextEditor.Color color="#37B24D"/>
          <RichTextEditor.Color color="#F59F00"/>
        </RichTextEditor.ControlsGroup>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold/>
          <RichTextEditor.Italic/>
          <RichTextEditor.Underline/>
          <RichTextEditor.Strikethrough/>
          <RichTextEditor.ClearFormatting/>
          <RichTextEditor.Highlight/>
        </RichTextEditor.ControlsGroup>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1/>
          <RichTextEditor.H2/>
          <RichTextEditor.H3/>
        </RichTextEditor.ControlsGroup>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft/>
          <RichTextEditor.AlignCenter/>
          <RichTextEditor.AlignRight/>
        </RichTextEditor.ControlsGroup>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link/>
          <RichTextEditor.Unlink/>
        </RichTextEditor.ControlsGroup>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote/>
          <RichTextEditor.Hr/>
          <RichTextEditor.BulletList/>
          <RichTextEditor.OrderedList/>
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>
      <ContentWrapper>
        <RichTextEditor.Content/>
        {buttons && buttons.length > 0 && (
          <div style={{
            alignItems: "center",
            display: "flex",
            gap: 12,
            justifyContent: "flex-end",
            padding: 20,
          }}>
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
