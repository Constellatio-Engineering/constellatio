import { toast } from "@/components/ui/sonner";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import { api } from "@/utils/api";

import useContextAndErrorIfNull from "./useContextAndErrorIfNull";

// THIS IS BASED ON ----> useAddBookmark <----
const useCreateFlashcard = () =>
{
  const utils = api.useUtils();
  const { invalidateFlashcards } = useContextAndErrorIfNull(InvalidateQueriesContext);

  // TODO: QUESTION @Kotti: why we set the data for query when the mutation go wrong? -> I think the data is still the same or?
  return api.flashcards.createFlashcard.useMutation({
    onError: (err, newFlashcard, context) =>
    {
      // type of context is inferred as unknown for some reason
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // utils.flashcards.getFlashcards.setData(undefined, (context as any).previousFlashcards);
      console.log("Something went wrong while adding bookmark: ", { context, err, newFlashcard });

      // TODO: ADD Toast (warning)
      toast.error("Failed to delete flashcard", {
        description: err.message
      });
    },
    onMutate: async (newFlashcard) =>
    {
      await utils.flashcards.getFlashcards.cancel();
      const previousFlashcards = utils.flashcards.getFlashcards.getData();

      // TODO: QUESTION @Kotti: is this for optimistic updates?
      // utils.flashcards.getFlashcards.setData({ resourceType: newFlashcard.resourceType }, (oldFlashcards = []) =>
      // {
      //   return [...oldFlashcards, newFlashcard];
      // });

      return { previousFlashcards: previousFlashcards ?? [] };
    },
    // TODO: ADD Toast (successfull)
    // TODO: QUESTION @Kotti: utils.flashcards.getFlashcards.invalidate();
    onSettled: invalidateFlashcards 
  });
};

export default useCreateFlashcard;
