import { Button } from "@/components/atoms/Button/Button";
import { Check } from "@/components/Icons/Check";
import useCaseSolvingStore from "@/stores/caseSolving.store";

import { RichTextEditor, Link } from "@mantine/tiptap";
import { Placeholder } from "@tiptap/extension-placeholder";
import { type Content, useEditor, type Editor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { type FC, useEffect } from "react";

import { ContentWrapper, richtextEditorFieldStyles } from "./RichtextEditorField.styles";

export interface RichtextEditorFieldProps
{
  readonly action?: (editor: Editor) => void;
  readonly button?: {
    text?: string;
  };
  readonly content?: Content;
  readonly variant: "simple" | "with-legal-quote";
}

export const RichtextEditorField: FC<RichtextEditorFieldProps> = ({
  action,
  button,
  content = "",
  variant
}) =>
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
  const setIsStepCompleted = useCaseSolvingStore((state) => state.setIsStepCompleted);

  useEffect(() =>
  {
    if(editor?.isEmpty)
    {
      setIsStepCompleted(false);
    }

    if(!editor?.isEmpty)
    {
      setIsStepCompleted(true);
    }

  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , [editor?.isEmpty]); 

  const handleSubmit = (): void => 
  {
    if(action && editor) { action(editor); }
  };

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
