"use client";

import { Editor } from "@tiptap/react";
import { ToolbarButtons } from "./toolbar-buttons";

interface EditorToolbarProps {
  editor: Editor | null;
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  if (!editor) return null;

  return (
    <div className="border-b px-3 py-2 flex gap-1 flex-wrap items-center bg-white">
      <ToolbarButtons editor={editor} />
    </div>
  );
}