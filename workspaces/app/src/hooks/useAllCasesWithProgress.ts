import { type CaseProgressState } from "@/db/schema";
import { type IGenCase } from "@/services/graphql/__generated/sdk";

import useCases from "./useCases";
import useCasesProgress from "./useCasesProgress";

type UseAllCasesWithProgress = () => {
  casesWithProgress: Array<IGenCase & {
    progress: CaseProgressState;
  }>;
};

const useAllCasesWithProgress: UseAllCasesWithProgress = () =>
{
  const { allCases } = useCases();
  const { casesProgress } = useCasesProgress();

  const casesWithProgress = allCases
    .map(legalCase => ({
      ...legalCase,
      progress: casesProgress?.find(caseProgress => caseProgress?.caseId === legalCase?.id)?.progressState ?? "not-started"
    }));

  return {
    casesWithProgress,
  };
};

export default useAllCasesWithProgress;
