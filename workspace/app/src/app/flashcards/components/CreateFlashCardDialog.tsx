
"use client";

import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCreateFlashcard from "@/hooks/useCreateFlashcard";

import type { Content } from "@tiptap/react";
import { useState } from "react";
import { toast } from "sonner";

const CreateFlashcardDialog = () => 
{
  // State for tracking the content of both editors
  const [questionContent, setQuestionContent] = useState<Content>("");
  const [answerContent, setAnswerContent] = useState<Content>("");
  
  // State for tracking the selected set
  const [selectedSet, setSelectedSet] = useState<string | null>(null);
  
  const { mutateAsync: createFlashcard } = useCreateFlashcard();

  // Mock function to simulate creating a flashcard
  const handleCreateFlashcard = async () => 
  {
    // Validate inputs
    if(!questionContent || !answerContent) 
    {
      toast("Pls fill question and answer!");
      return;
    }

    // Prepare data for backend submission
    const flashcardData = {
      answer: answerContent,
      // set: selectedSet
      collectionId: selectedSet,
      
      question: questionContent
    };
    
    await createFlashcard(flashcardData);
    console.log("Flashcard Data:", flashcardData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={handleCreateFlashcard}>Creat new Flashcard</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Create a flashcard</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="set">Assign To Set</Label>
            <Select 
              value={selectedSet}
              onValueChange={setSelectedSet}>
              <SelectTrigger>
                <SelectValue placeholder="Select a collection"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="exam">Exam Collection</SelectItem>
                <SelectItem value="study">Study Collection</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Question</Label>
            <MinimalTiptapEditor
              value={questionContent}
              onChange={setQuestionContent}
            />
          </div>
          <div className="grid gap-2">
            <Label>Answer</Label>
            <MinimalTiptapEditor
              value={answerContent}
              onChange={setAnswerContent}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleCreateFlashcard}>
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFlashcardDialog;
