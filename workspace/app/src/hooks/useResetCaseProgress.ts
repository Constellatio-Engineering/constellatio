import useContextAndErrorIfNull from "@/hooks/useContextAndErrorIfNull";
import { InvalidateQueriesContext } from "@/provider/InvalidateQueriesProvider";
import useDragDropGameStore from "@/stores/dragDropGame.store";
import useFillGapsGameStore from "@/stores/fillGapsGame.store";
import useSelectionCardGameStore from "@/stores/selectionCardGame.store";
import { api } from "@/utils/api";

export const useResetCaseProgress = () =>
{
  const resetSelectionCardGames = useSelectionCardGameStore(s => s.resetGamesForCase);
  const resetDragDropGames = useDragDropGameStore(s => s.resetGamesForCase);
  const resetFillGapsGames = useFillGapsGameStore(s => s.resetGamesForCase);
  const { invalidateCaseProgress, invalidateGamesProgress } = useContextAndErrorIfNull(InvalidateQueriesContext);
  return api.casesProgress.resetProgress.useMutation({
    onError: (error) => console.error(error),
    onSuccess: async (caseId) =>
    {
      await invalidateGamesProgress({ caseId, queryType: "byCaseId" });
      await invalidateCaseProgress({ caseId });
      resetFillGapsGames(caseId);
      resetSelectionCardGames(caseId);
      resetDragDropGames(caseId);
    }
  });
};
