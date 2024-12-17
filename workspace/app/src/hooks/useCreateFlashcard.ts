"use client";
import { toast } from "@/components/ui/sonner";
import { InvalidateQueriesContext } from "@/provider/appRouterSpecific/InvalidateQueriesProvider";
import { api } from "@/trpc/react";

import useContextAndErrorIfNull from "./useContextAndErrorIfNull";

// THIS IS BASED ON ----> useAddBookmark <----
const useCreateFlashcard = () =>
{
  const utils = api.useUtils();
  const { invalidateFlashcards } = useContextAndErrorIfNull(InvalidateQueriesContext);

  // TODO: QUESTION @Kotti: why we set the data for query when the mutation go wrong? -> I think the data is still the same or?
  const { isPending: creatFlashcardIsPending, mutateAsync: createFlashcard } = api.flashcards.createFlashcard.useMutation({
    onError: (err, newFlashcard, context) =>
    {
      // type of context is inferred as unknown for some reason
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // utils.flashcards.getFlashcards.setData(undefined, (context as any).previousFlashcards);
      console.log("Something went wrong while adding flashcard: ", { context, err, newFlashcard });

      // TODO: ADD Toast (warning)
      toast.error("Failed to create flashcard", {
        description: err.message
      });
    },
    onMutate: async (newFlashcard) =>
    {
      console.log("schafft es bis 1.");
      
      await utils.flashcards.getFlashcards.cancel();
      const previousFlashcards = utils.flashcards.getFlashcards.getData();
      
      console.log("schafft es bis 2.");
      // TODO: QUESTION @Kotti: is this for optimistic updates?
      // utils.flashcards.getFlashcards.setData({ resourceType: newFlashcard.resourceType }, (oldFlashcards = []) =>
      // {
      //   return [...oldFlashcards, newFlashcard];
      // });

      return { previousFlashcards: previousFlashcards ?? [] };
    },
    // TODO: ADD Toast (successfull)
    // TODO: QUESTION @Kotti: utils.flashcards.getFlashcards.invalidate();
    // onSettled: async () => api.useUtils().flashcards.invalidate()// invalidateFlashcards 

    onSettled: async () => 
    {
      toast.success("Successfully created a new flashcard");
      return utils.flashcards.getFlashcards.invalidate();
    }
  });

  return {
    creatFlashcardIsPending,
    createFlashcard,
  };
};

export default useCreateFlashcard;
