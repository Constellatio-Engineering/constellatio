import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { ContentWrapper, richtextEditorFieldStyles } from "./RichtextEditorField.styles";
import { FC } from "react";
import { Button } from "@/components/atoms/Button/Button";
import { Check } from "@/components/Icons/Check";

const content =
  '<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';

type TRichtextEditorField = {
  variant: "simple" | "with-legal-quote";
};

export const RichtextEditorField: FC<TRichtextEditorField> = ({ variant }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Placeholder.configure({
        placeholder: `${variant === "simple" ? "Enter your case solution here..." : "Start typing here..."} `,
      }),
    ],
    content: "",
  });

  return (
    <RichTextEditor editor={editor} styles={richtextEditorFieldStyles({})}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          {variant === "with-legal-quote" && <RichTextEditor.Blockquote />}
        </RichTextEditor.ControlsGroup>
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
