import { z } from "zod";

import { idValidation } from "../../common/common.validation";

export const getGamesProgressSchema = z.discriminatedUnion("queryType", [
  z.object({
    caseId: idValidation,
    queryType: z.literal("byCaseId")
  }),
  z.object({
    gamesIds: z.array(idValidation),
    queryType: z.literal("byGameIds")
  })
]);

export type GetGamesProgressSchema = z.input<typeof getGamesProgressSchema>;
