"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { EditorToolbar } from "./toolbar/editor-toolbar";
import { extensions } from "./extensions";

interface TipTapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const TipTapEditor = ({ content, onChange, placeholder }: TipTapEditorProps) => {
  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose-base focus:outline-none px-4 py-3 min-h-[200px] overflow-y-auto max-h-[400px]",
        "data-placeholder": placeholder,
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="rounded-lg border bg-white overflow-hidden">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTapEditor;