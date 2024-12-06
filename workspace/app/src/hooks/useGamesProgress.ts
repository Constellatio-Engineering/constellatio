import { api } from "@/utils/api";

import { type Nullable } from "@constellatio/utility-types";

const useGamesProgress = (caseId: Nullable<string>) =>
{
  return api.gamesProgress.getGamesProgress.useQuery({ caseId: caseId! }, {
    enabled: caseId != null,
  });
};

export default useGamesProgress;
