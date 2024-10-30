import { type IGenCase } from "@constellatio/cms/generated-types";
import { type CaseProgressState } from "@constellatio/shared/validation";

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
