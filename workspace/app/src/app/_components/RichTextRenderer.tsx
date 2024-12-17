"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import type { Content } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useMemo } from "react";

interface RichTextRendererProps 
{
  // This will be the JSON content from Tiptap
  className?: string; 
  content: Content;
}

export const RichTextRenderer: React.FC<RichTextRendererProps> = ({ className, content }) => 
{
  // Create a read-only editor to render the content
  const editor = useEditor({
    
    content,
    editable: false,
    extensions: [StarterKit],
    immediatelyRender: false
  });

  return <EditorContent editor={editor} className={className}/>;
};
