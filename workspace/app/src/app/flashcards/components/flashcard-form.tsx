"use client";

import TipTapEditor from "@/app/_components/editor/tiptap-editor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useCreateFlashcard from "@/hooks/useCreateFlashcard";

import { createFlashcardSchema, type CreateFlashcardSchema } from "@constellatio/schemas/routers/flashcards/createFlashcard.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";

import { CollectionSelect } from "./collection-select";

export function FlashcardForm() 
{
  const { createFlashcard, creatFlashcardIsPending } = useCreateFlashcard();

  const form = useForm<CreateFlashcardSchema>({
    defaultValues: {
      answer: "",
      collectionId: "",
      question: "",
    },
    resolver: zodResolver(createFlashcardSchema),
  });

  const onSubmit = async (data: CreateFlashcardSchema) => 
  {
    const success = await createFlashcard(data);
    if(success) 
    {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="py-4 space-y-4">
        <FormField
          control={form.control}
          name="collectionId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assign To Set</FormLabel>
              <FormControl>
                <CollectionSelect
                  value={field.value}
                  onSelect={field.onChange}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question</FormLabel>
                <FormControl>
                  <TipTapEditor
                    content={field.value}
                    onChange={field.onChange}
                    placeholder="Enter your question here..."
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Answer</FormLabel>
                <FormControl>
                  <TipTapEditor
                    content={field.value}
                    onChange={field.onChange}
                    placeholder="Enter your answer here..."
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" disabled={creatFlashcardIsPending}>
            {creatFlashcardIsPending ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
