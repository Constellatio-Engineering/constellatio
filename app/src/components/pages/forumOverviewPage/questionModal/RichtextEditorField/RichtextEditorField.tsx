/* eslint-disable max-lines */
import { Button, type TButton } from "@/components/atoms/Button/Button";
import type { PostQuestionSchema } from "@/schemas/forum/postQuestion.schema";

import { Skeleton } from "@mantine/core";
import { type GetInputProps } from "@mantine/form/lib/types";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import { Placeholder } from "@tiptap/extension-placeholder";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Underline } from "@tiptap/extension-underline";
import { type Editor, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import React, { type FunctionComponent, useEffect, useState } from "react";

import * as styles from "./RichtextEditorField.styles";

type RichtextEditorButton = {
  readonly action: (editor: Editor) => void;
  readonly overwriteDisabled?: boolean;
  readonly props: TButton;
  readonly text: string;
} | null;

interface Props extends Omit<ReturnType<GetInputProps<PostQuestionSchema>>, "onChange">
{
  readonly buttons?: RichtextEditorButton[];
  readonly id?: string;
  readonly label?: string;
  readonly minHeight?: number;
  readonly noMinHeight?: boolean;
  readonly onChange?: (value: PostQuestionSchema["text"]) => void;
  readonly placeholder: string;
  readonly toolbarLeftContent?: React.ReactNode;
  readonly useInitialLoadingState?: boolean;
  readonly value: PostQuestionSchema["text"];
}

export const RichtextEditorField: FunctionComponent<Props> = ({
  buttons,
  error,
  id,
  label,
  minHeight = 370,
  noMinHeight = false,
  onBlur,
  onChange,
  onFocus,
  placeholder,
  toolbarLeftContent,
  useInitialLoadingState = false,
  value
}) =>
{
  const [isLoading, setIsLoading] = useState<boolean>(useInitialLoadingState);

  const editor = useEditor({
    content: value,
    extensions: [
      Link,
      StarterKit,
      Underline,
      TextStyle,
      Highlight,
      Color,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    onUpdate: ({ editor }) =>
    {
      if(onChange == null)
      {
        return;
      }
      onChange(editor.getHTML());
    },
    parseOptions: {
      preserveWhitespace: true,
    }
  });

  useEffect(() =>
  {
    const timeout = setTimeout(() =>
    {
      setIsLoading(false);
    }, 250);

    return () =>
    {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div css={[styles.wrapper, isLoading && styles.wrapperLoading]} id={id}>
      {isLoading && (
        <div css={styles.loadingState}>
          <div style={{ alignItems: "center", display: "flex", justifyContent: "space-between" }}>
            <Skeleton width={150} height={20}/>
            <Skeleton width={270} height={20}/>
          </div>
          <Skeleton
            mt={40}
            width={"100%"}
            height={50}
            mb={20}
          />
          <div style={{ alignItems: "center", display: "flex", gap: 12 }}>
            <Skeleton width={120} height={44}/>
            <Skeleton width={150} height={44}/>
          </div>
        </div>
      )}
      {label && (
        <p css={styles.label(error != null)}>
          {label}
        </p>
      )}
      <RichTextEditor
        editor={editor}
        onBlur={onBlur}
        onFocus={onFocus}
        styles={styles.richtextEditorFieldStyles({ hasError: error != null, minHeight, noMinHeight })}>
        <RichTextEditor.Toolbar>
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <div>
              {toolbarLeftContent}
            </div>
            <div style={{ display: "flex", gap: "1em" }}>
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
            </div>
          </div>
        </RichTextEditor.Toolbar>
        <div css={styles.contentWrapper}>
          <RichTextEditor.Content/>
          {buttons && buttons.length > 0 && (
            <div css={styles.buttonsWrapper}>
              {buttons.filter(Boolean).map((button, index) =>
              {
                let isDisabled: boolean;

                if(button.overwriteDisabled != null)
                {
                  isDisabled = button.overwriteDisabled;
                }
                else if(editor == null)
                {
                  isDisabled = true;
                }
                else
                {
                  isDisabled = button.props.disabled || editor.isEmpty;
                }

                return (
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
                    disabled={isDisabled}>
                    {button?.text}
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      </RichTextEditor>
      {error && (
        <p css={styles.error}>{error}</p>
      )}
    </div>
  );
};
