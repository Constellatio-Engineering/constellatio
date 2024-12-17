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

import {
  createFlashcardSchema,
  type CreateFlashcardSchema,
} from "@constellatio/schemas/routers/flashcards/createFlashcard.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";

import { FlashcardsSetsSelect } from "./flashcards-sets-select";

export function FlashcardForm() 
{
  const form = useForm<CreateFlashcardSchema>({
    defaultValues: {
      answer: "",
      question: "",
      sets: [],
    },
    resolver: zodResolver(createFlashcardSchema),
  });

  const { isPending: createFlashcardIsPending, mutateAsync: createFlashcard } =
    useCreateFlashcard();

  const onSubmit = async (data: CreateFlashcardSchema) => 
  {
    console.log("Form submitted with values:", {
      answer: data.answer,
      question: data.question,
      sets: data.sets,
    });

    await createFlashcard({
      answer: data.answer,
      question: data.question,
      // FIXME: endpoint dnekt noch er bekommt einzelne uuid! ändern in array
      sets: data.sets,
    });

    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="py-4 space-y-4">
        <FormField
          control={form.control}
          name="sets"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assign To Set</FormLabel>
              <FormControl>
                <FlashcardsSetsSelect
                // fix uuid -> uuid[] ...
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
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          {/* TODO: loading spinner if createFlashcardIsPending */}
          <Button type="submit" disabled={createFlashcardIsPending}>
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
}
