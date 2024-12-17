import { toast } from "@/components/ui/sonner";
import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { api } from "@/utils/api";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useFlashcards = () =>
{
  const utils = api.useUtils();
  return api.flashcards.getFlashcards.useQuery({ setId: undefined });
};

export default useFlashcards;

