import { type IGenCase } from "@/services/graphql/__generated/sdk";

import useCases from "./useCases";
import useCasesProgress from "./useCasesProgress";

type UseAllCasesWithProgress = (
) => { cases: Array<IGenCase & { progress: "completed" | "not-started" | "completing-tests" | "solving-case" | undefined}> };

const useAllCasesWithProgress: UseAllCasesWithProgress = () =>
{
  const { casesProgress } = useCasesProgress();
  const { allCases } = useCases();
  const allCasesProgressFiltered = allCases.filter(x => casesProgress?.some(y => y?.caseId === x?.id));
  const casesWithProgress = allCasesProgressFiltered?.map(x => ({ ...x, progress: casesProgress?.find(y => y?.caseId === x?.id)?.progressState }));
  //   const total = casesWithProgress?.filter(x => x?.mainCategoryField?.[0]?.mainCategory === categoryId)?.length;
  //   const completed = casesWithProgress?.filter(x => x?.mainCategoryField?.[0]?.mainCategory === categoryId && x?.progress === "completed")?.length;
  return {
    cases: casesWithProgress
  };
};

export default useAllCasesWithProgress;
