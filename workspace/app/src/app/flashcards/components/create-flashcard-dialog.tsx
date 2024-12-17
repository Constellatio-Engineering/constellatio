"use client";

import TipTapEditor from "@/app/_components/editor/tiptap-editor";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import useCreateFlashcard from "@/hooks/useCreateFlashcard";

import { useState } from "react";

import { CollectionSelect } from "./collection-select";
import { FlashcardForm } from "./flashcard-form";

export function CreateFlashcardDialog2() 
{
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [collection, setCollection] = useState<null | string>(null);

  const { mutateAsync: createFlashcard } = useCreateFlashcard();

  // Mock function to simulate creating a flashcard
  const handleCreateFlashcard = async () => 
  {
    // TODO: Validate inputs (maybe via Zod because we use Form)
    // if(!questionContent || !answerContent) 
    // {
    //   toast("Pls fill question and answer!");
    //   return;
    // }

    // Prepare data for backend submission
    const flashcardData = {
      answer,
      // set: selectedSet
      collectionId: collection,
      
      question
    };
    
    await createFlashcard(flashcardData);
    console.log("Flashcard Data:", flashcardData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Flashcard</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Create a flashcard</DialogTitle>
        </DialogHeader>
        <FlashcardForm
          question={question}
          answer={answer}
          collection={collection}
          onQuestionChange={setQuestion}
          onAnswerChange={setAnswer}
          onCollectionChange={setCollection}
          onSubmit={handleCreateFlashcard}
        />
      </DialogContent>
    </Dialog>
  );
}
