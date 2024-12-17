"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useState } from "react";

import { RichTextEditor } from "./rich-text-editor";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CreateFlashcardDialogProps 
{
  readonly onOpenChange: (open: boolean) => void;
  readonly open: boolean;
}

export function CreateFlashcardDialog({ onOpenChange, open }: CreateFlashcardDialogProps) 
{
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [set, setSet] = useState("");

  const handleCreate = () => 
  {
    // Handle flashcard creation here
    console.log({ answer, question, set });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create a flashcard</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Assign To Set</label>
            <Select value={set} onValueChange={setSet}>
              <SelectTrigger>
                <SelectValue placeholder="Select a set"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="exam">Exam Collection</SelectItem>
                <SelectItem value="study">Study Notes</SelectItem>
                <SelectItem value="general">General Knowledge</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                QUESTION
              </label>
              <RichTextEditor
                placeholder="Enter your question"
                value={question}
                onChange={setQuestion}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                ANSWER
              </label>
              <RichTextEditor
                placeholder="Enter your answer"
                allowImage
                value={answer}
                onChange={setAnswer}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleCreate}>Create</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
