"use client";

import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Code,
  Quote,
  Strikethrough,
} from "lucide-react";
import { ToolbarButton } from "./toolbar-button";
import { Separator } from "@/components/ui/separator";

interface ToolbarButtonsProps {
  editor: Editor | null;
}

export function ToolbarButtons({ editor }: ToolbarButtonsProps) {
  if (!editor) return null;

  const buttons = [
    [
      {
        icon: Bold,
        isActive: editor.isActive("bold"),
        onClick: () => editor.chain().focus().toggleBold().run(),
        title: "Bold",
      },
      {
        icon: Italic,
        isActive: editor.isActive("italic"),
        onClick: () => editor.chain().focus().toggleItalic().run(),
        title: "Italic",
      },
      {
        icon: Strikethrough,
        isActive: editor.isActive("strike"),
        onClick: () => editor.chain().focus().toggleStrike().run(),
        title: "Strikethrough",
      },
    ],
    [
      {
        icon: Heading1,
        isActive: editor.isActive("heading", { level: 1 }),
        onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        title: "Heading 1",
      },
      {
        icon: Heading2,
        isActive: editor.isActive("heading", { level: 2 }),
        onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        title: "Heading 2",
      },
      {
        icon: Heading3,
        isActive: editor.isActive("heading", { level: 3 }),
        onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        title: "Heading 3",
      },
    ],
    [
      {
        icon: List,
        isActive: editor.isActive("bulletList"),
        onClick: () => editor.chain().focus().toggleBulletList().run(),
        title: "Bullet List",
      },
      {
        icon: ListOrdered,
        isActive: editor.isActive("orderedList"),
        onClick: () => editor.chain().focus().toggleOrderedList().run(),
        title: "Numbered List",
      },
    ],
    [
      {
        icon: Code,
        isActive: editor.isActive("code"),
        onClick: () => editor.chain().focus().toggleCode().run(),
        title: "Code",
      },
      {
        icon: Quote,
        isActive: editor.isActive("blockquote"),
        onClick: () => editor.chain().focus().toggleBlockquote().run(),
        title: "Quote",
      },
    ],
  ];

  return (
    <div className="flex items-center gap-1">
      {buttons.map((group, groupIndex) => (
        <div key={groupIndex} className="flex items-center">
          {group.map((button, buttonIndex) => (
            <ToolbarButton
              key={buttonIndex}
              editor={editor}
              {...button}
            />
          ))}
          {groupIndex < buttons.length - 1 && (
            <Separator orientation="vertical" className="mx-1 h-6" />
          )}
        </div>
      ))}
    </div>
  );
}