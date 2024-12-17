"use client";

import { Editor } from "@tiptap/react";
import { Separator } from "@/components/ui/separator";
import { ToolbarButtons } from "./toolbar-buttons";

interface EditorToolbarProps {
  editor: Editor | null;
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  if (!editor) return null;

  return (
    <div className="border-b p-2 flex gap-1 flex-wrap items-center">
      <ToolbarButtons editor={editor} />
      <Separator orientation="vertical" className="mx-1 h-6" />
    </div>
  );
}