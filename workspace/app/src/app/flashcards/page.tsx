"use client";

import { MinimalTiptapEditor } from "@/app/_components/minimal-tiptap";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import useCreateFlashcard from "@/hooks/useCreateFlashcard";
import useFlashcards from "@/hooks/useFlashcards";
import { api } from "@/trpc/react";

import { useCallback } from "react";

// import CreateFlashcardDialog from "./components/CreateFlashcardDialog";
import { CreateFlashcardDialog } from "./components/create-flashcard-dialog";
import { Flashcard } from "./components/Flashcard";

/* 
Current plan:

Button create flashcard open a modal 
  - check modal from shadcn

*/

// TODO: remove test data
const flashcardData = [
  {
    answer:
      "€10,000 (office furniture worth €8,000 and two work laptops worth €2,000)",
    dueIn: "IN 2 DAYS",
    id: "a",
    question:
      "What is the total amount of purchases for Lisa and Diana's consulting company?",
    status: "upcoming" as const,
  },
  {
    answer:
      "€10,000 (office furniture worth €8,000 and two work laptops worth €2,000)",
    dueIn: "TODAY",
    id: "b",
    question:
      "What is the total amount of purchases for Lisa and Diana's consulting company?",
    status: "completed" as const,
  },
  {
    answer:
      "€10,000 (office furniture worth €8,000 and two work laptops worth €2,000)",
    dueIn: "IN 2 DAYS",
    id: "c",
    question:
      "What is the total amount of purchases for Lisa and Diana's consulting company?",
    status: "upcoming" as const,
  },
  {
    answer:
      "€10,000 (office furniture worth €8,000 and two work laptops worth €2,000)",
    dueIn: "TODAY",
    id: "d",
    question:
      "What is the total amount of purchases for Lisa and Diana's consulting company?",
    status: "completed" as const,
  },
];

export default function PrototypePage() 
{
  // get flashcards TODO: outsource to custom hook -> AI
  const { data: flashcards = [], error, isLoading } = useFlashcards();

  if(isLoading) 
  {
    // TODO: grid with skeletons
    return "LOADING FLASHCARDS ON CLIENT";
  }

  if(error) 
  {
    return "LOADING FLASHCARDS ON CLIENT ERROR";
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <CreateFlashcardDialog/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {flashcards.map((card) => (
          <Flashcard
            id={card.id}
            key={card.id}
            status={card.status}
            dueIn={card.dueIn}
            question={card.question}
            answer={card.answer}
          />
        ))}
      </div>
      {/* Test integration */}
    </div>
  );
}

/* TODO:

  - fix select is optional
  - integrate schema validation on client side
  - integrate schema validation on server side
  - execute correct custom hook useCreateFlashcard on submit the form

*/
