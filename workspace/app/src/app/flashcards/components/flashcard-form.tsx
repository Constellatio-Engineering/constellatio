"use client";

import TipTapEditor from "@/app/_components/editor/tiptap-editor";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { CollectionSelect } from "./collection-select";

interface FlashcardFormProps 
{
  readonly answer: string;
  readonly collection: null | string;
  readonly onAnswerChange: (value: string) => void;
  readonly onCollectionChange: (value: string) => void;
  readonly onQuestionChange: (value: string) => void;
  readonly onSubmit: () => void;
  readonly question: string;
}

/* TODO: refactor to real Form use Shadcn and react hook form if possible */
export function FlashcardForm({
  answer,
  collection,
  onAnswerChange,
  onCollectionChange,
  onQuestionChange,
  onSubmit,
  question,
}: FlashcardFormProps) 
{
  return (
    <div className="py-4 space-y-4">
      <CollectionSelect onSelect={onCollectionChange}/>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Question</Label>
          <TipTapEditor
            content={question}
            onChange={onQuestionChange}
            placeholder="Enter your question here..."
          />
        </div>
        <div className="space-y-2">
          <Label>Answer</Label>
          <TipTapEditor
            content={answer}
            onChange={onAnswerChange}
            placeholder="Enter your answer here..."
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button onClick={onSubmit}>Create</Button>
      </div>
    </div>
  );
}
