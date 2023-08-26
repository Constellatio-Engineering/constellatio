import { Button } from "@/components/atoms/Button/Button";
import { Check } from "@/components/Icons/Check";

import { RichTextEditor, Link } from "@mantine/tiptap";
import { Placeholder } from "@tiptap/extension-placeholder";
import { type Content, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { type FC } from "react";

import { ContentWrapper, richtextEditorFieldStyles } from "./RichtextEditorField.styles";

interface TRichtextEditorField 
{
  readonly content?: Content;
  readonly variant: "simple" | "with-legal-quote";
}

export const RichtextEditorField: FC<TRichtextEditorField> = ({ content = "", variant }) => 
{
  const editor = useEditor({
    content,
    extensions: [
      StarterKit,
      Link,
      Placeholder.configure({
        placeholder: `${variant === "simple" ? "Enter your case solution here..." : "Start typing here..."} `,
      }),
    ],
  });

  return (
    <RichTextEditor editor={editor} styles={richtextEditorFieldStyles()}>
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
        <div>
          <Button<"button">
            styleType="primary"
            size="large"
            type="button"
            leftIcon={<Check/>}
            disabled={editor?.isEmpty}>
            Submit and see results
          </Button>
        </div>
      </ContentWrapper>
    </RichTextEditor>
  );
};
