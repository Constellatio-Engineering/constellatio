import { z } from "zod";

import { idValidation } from "../../common/common.validation";

export const getCasesProgressSchema = z
  .object({
    caseIds: idValidation.array().min(1),
  })
  .optional();

export type GetCasesProgressSchema = z.input<typeof getCasesProgressSchema>;
