import { RichTextEditor, Link } from "@mantine/tiptap";
import { Content, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { ContentWrapper, richtextEditorFieldStyles } from "./RichtextEditorField.styles";
import { FC } from "react";
import { Button } from "@/components/atoms/Button/Button";
import { Check } from "@/components/Icons/Check";

type TRichtextEditorField = {
  variant: "simple" | "with-legal-quote";
  content?: Content;
};

export const RichtextEditorField: FC<TRichtextEditorField> = ({ variant, content = "" }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Placeholder.configure({
        placeholder: `${variant === "simple" ? "Enter your case solution here..." : "Start typing here..."} `,
      }),
    ],
    content,
  });

  return (
    <RichTextEditor editor={editor} styles={richtextEditorFieldStyles({})}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
        </RichTextEditor.ControlsGroup>
        <span className="control-group-separator"></span>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
        </RichTextEditor.ControlsGroup>

        {variant === "with-legal-quote" && (
          <RichTextEditor.ControlsGroup className="blockquote-control">
            <RichTextEditor.Blockquote />
          </RichTextEditor.ControlsGroup>
        )}
      </RichTextEditor.Toolbar>

      <ContentWrapper>
        <RichTextEditor.Content />
        <div>
          <Button styleType="primary" size="large" type="button" leftIcon={<Check />} disabled={editor?.isEmpty}>
            Submit and see results
          </Button>
        </div>
      </ContentWrapper>
    </RichTextEditor>
  );
};
