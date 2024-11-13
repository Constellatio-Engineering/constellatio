import { api } from "@/utils/api";
import { type UseQueryResult } from "@/utils/types";

import { type GameProgress } from "@constellatio/db/schema";
import { type Nullable } from "@constellatio/utility-types";

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
