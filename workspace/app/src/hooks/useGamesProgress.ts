import { api } from "@/utils/api";
import { type Nullable, type UseQueryResult } from "@/utils/types";

import { type GameProgress } from "@/db/schema";

type UseGamesProgress = (caseId: Nullable<string>) => UseQueryResult<{ gamesProgress: GameProgress[] | undefined }>;

const useGamesProgress: UseGamesProgress = (caseId) =>
{
  const { data: gamesProgress, error, isLoading } = api.gamesProgress.getGamesProgress.useQuery({ caseId: caseId! }, {
    enabled: caseId != null,
  });

  return {
    error,
    gamesProgress,
    isLoading
  };
};

export default useGamesProgress;
