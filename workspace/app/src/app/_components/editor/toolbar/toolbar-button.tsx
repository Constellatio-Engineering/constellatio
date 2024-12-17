"use client";

import { Editor } from "@tiptap/react";
import { Toggle } from "@/components/ui/toggle";
import { LucideIcon } from "lucide-react";

interface ToolbarButtonProps {
  editor: Editor;
  isActive: boolean;
  onClick: () => boolean;
  icon: LucideIcon;
  title: string;
}

export function ToolbarButton({
  editor,
  isActive,
  onClick,
  icon: Icon,
  title,
}: ToolbarButtonProps) {
  if (!editor) return null;

  return (
    <Toggle
      size="sm"
      pressed={isActive}
      onPressedChange={onClick}
      title={title}
      className="h-8 w-8 p-0 data-[state=on]:bg-muted data-[state=on]:text-muted-foreground"
    >
      <Icon className="h-4 w-4" />
    </Toggle>
  );
}