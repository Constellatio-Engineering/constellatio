"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";

import { FlashcardForm } from "./flashcard-form";

export function CreateFlashcardDialog() 
{
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Flashcard</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Create a flashcard</DialogTitle>
        </DialogHeader>
        <FlashcardForm/>
      </DialogContent>
    </Dialog>
  );
}
