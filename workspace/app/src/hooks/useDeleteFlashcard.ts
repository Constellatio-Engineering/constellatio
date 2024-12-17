import { toast } from "@/components/ui/sonner";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { api } from "@/utils/api";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useDeleteFlashcard = () =>
{
  const utils = api.useUtils();
  return api.flashcards.deleteFlashcard.useMutation({
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

};

export default useDeleteFlashcard;
