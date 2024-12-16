"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { useState } from "react";

interface FlashcardContentProps 
{
  readonly answer: string;
  readonly question: string;
}

export function FlashcardContent({ answer, question }: FlashcardContentProps) 
{
  const [showAnswer, setShowAnswer] = useState(false);
  const [progress, setProgress] = useState(0);

  const toggleAnswer = () => 
  {
    setShowAnswer(!showAnswer);
    setProgress(showAnswer ? 0 : 100);
  };

  return (
    <div className="space-y-4">
      <div className="min-h-[120px] flex flex-col justify-between">
        <h2 className="text-base font-medium leading-relaxed">{question}</h2>
        {showAnswer && (
          <div className="text-sm text-gray-600 mt-2">
            {answer}
          </div>
        )}
      </div>
      <div className="space-y-3">
        <Progress value={progress} className="w-full h-1"/>
        <Button 
          onClick={toggleAnswer}
          className="w-full"
          variant="outline"
          size="sm">
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </Button>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="hints">
            <AccordionTrigger className="text-xs text-gray-600 py-2">
              Need a hint?
            </AccordionTrigger>
            <AccordionContent className="text-xs text-gray-600">
              Try breaking down the problem into parts: office furniture and laptops.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
