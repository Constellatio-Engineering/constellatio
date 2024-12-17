"use client";

import { cn } from "@/lib/utils";

import {
  Bold, Italic, List, ListOrdered, ImageIcon 
} from "lucide-react";

import { Toggle } from "@/components/ui/toggle";

interface RichTextEditorProps 
{
  readonly allowImage?: boolean;
  readonly onChange: (value: string) => void;
  readonly placeholder?: string;
  readonly value: string;
}

export function RichTextEditor({ 
  allowImage = false, 
  onChange,
  placeholder,
  value 
}: RichTextEditorProps) 
{
  const handleFormat = (command: string) => 
  {
    document.execCommand(command, false);
  };

  return (
    <div className="border rounded-md">
      <div className="flex items-center gap-1 p-1 border-b">
        <Toggle
          size="sm"
          onClick={() => handleFormat("bold")}
          aria-label="Toggle bold">
          <Bold className="h-4 w-4"/>
        </Toggle>
        <Toggle
          size="sm"
          onClick={() => handleFormat("italic")}
          aria-label="Toggle italic">
          <Italic className="h-4 w-4"/>
        </Toggle>
        <Toggle
          size="sm"
          onClick={() => handleFormat("insertUnorderedList")}
          aria-label="Toggle bullet list">
          <List className="h-4 w-4"/>
        </Toggle>
        <Toggle
          size="sm"
          onClick={() => handleFormat("insertOrderedList")}
          aria-label="Toggle numbered list">
          <ListOrdered className="h-4 w-4"/>
        </Toggle>
        {allowImage && (
          <Toggle
            size="sm"
            onClick={() => 
            {
              const url = window.prompt("Enter image URL:");
              if(url) 
              {
                document.execCommand("insertImage", false, url);
              }
            }}
            aria-label="Insert image">
            <ImageIcon className="h-4 w-4"/>
          </Toggle>
        )}
      </div>
      <div
        className="min-h-[200px] p-3"
        contentEditable
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        dangerouslySetInnerHTML={{ __html: value }}
        placeholder={placeholder}
        suppressContentEditableWarning
      />
    </div>
  );
}

