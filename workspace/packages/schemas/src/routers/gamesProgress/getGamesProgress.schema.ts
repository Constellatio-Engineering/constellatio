import { z } from "zod";

import { idValidation } from "../../common/common.validation";

export const getGamesProgressSchema = z.object({
  caseId: idValidation
});

export type GetGamesProgressSchema = z.input<typeof getGamesProgressSchema>;
