import { type AppRouter } from "@/server/api/root";
import { api } from "@/utils/api";
import { type Nullable, type UseQueryResult } from "@/utils/types";

import { type inferProcedureOutput } from "@trpc/server";

export type GamesProgress = inferProcedureOutput<AppRouter["gamesProgress"]["getGamesProgress"]>;
type UseGamesProgress = (caseId: Nullable<string>) => UseQueryResult<{ gamesProgress: GamesProgress | undefined }>;

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
