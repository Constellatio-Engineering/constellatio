"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { api } from "@/utils/api";

import {
  type GetFlashcardsResult,
  type GetFlashcardResult,
} from "@constellatio/api/routers/flashcards.router";
import { useCallback, useState } from "react";

import { FlashcardMenu } from "./FlashcardMenu";
import { FlashcardStatus } from "./FlashcardStatus";
import { RichTextRenderer } from "../../_components/RichTextRenderer";

// TODO: QUESTION @Kotti: do you know this?
// RouterOutputs["flashcards"]["getFlashcards"]
// RouterOutputs["flashcards"]["getFlashcards"][number]
// TODO: use router output and extend with needed props
interface FlashcardProps extends GetFlashcardResult 
{
  readonly dueIn: string;
  // readonly onDelete?: () => void;
  // readonly onUpdate?: () => void;
  readonly status: "completed" | "upcoming";
}

// TODO: QUESTION @Kotti: is it correct that we pass down the callbacks or should I use an custom hook like useFlashcard here to access this?
export function Flashcard({
  answer,
  dueIn,
  id,
  // onDelete,
  // onUpdate,
  question,
  status = "completed",
}: FlashcardProps) 
{
  const [showAnswer, setShowAnswer] = useState(false);

  // utils to invalidate
  // TODO: set it to custom hook?
  const utils = api.useUtils();

  const { isPending: deleteFlashcardIsPending, mutateAsync: deleteFlashcard } =
    api.flashcards.deleteFlashcard.useMutation({
      onError: (error) => 
      {
        toast.error("Failed to delete flashcard", {
          description: error.message,
        });
      },
      onSettled: async () => 
      {
        return utils.flashcards.getFlashcards.invalidate();
      },
    });

  // Memoized toggle answer to prevent unnecessary re-renders
  const toggleAnswer = useCallback(() => 
  {
    setShowAnswer((prev) => !prev);
  }, []);

  // Memoized delete handler with error handling
  const onDelete = useCallback(async () => 
  {
    try 
    {
      await deleteFlashcard({ id });
      toast.success("Flashcard deleted successfully");
    }
    catch (error) 
    {
      // Error handling is done in the mutation options
    }
  }, [id, deleteFlashcard]);

  return (
    <Card className="w-full">
      <CardHeader className="space-y-0 pb-2">
        <div className="flex items-center justify-between">
          <FlashcardStatus status={status} dueIn={dueIn}/>
          {deleteFlashcardIsPending ? (
            "..."
          ) : (
            <FlashcardMenu onDelete={onDelete}/>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="min-h-[120px] space-y-4">
          {/* Use RichTextRenderer for question */}
          <h2 className="text-base font-medium leading-relaxed">
            <RichTextRenderer content={question} className="prose max-w-none"/>
          </h2>
          {showAnswer && (
            <div className="text-sm text-gray-600">
              <RichTextRenderer content={answer} className="prose max-w-none"/>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={toggleAnswer}
          className="w-full"
          variant="outline"
          size="sm">
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </Button>
      </CardFooter>
    </Card>
  );
}
