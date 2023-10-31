import { idValidation } from "@/schemas/common.validation";

import { z } from "zod";

export const getCasesProgressSchema = z
  .object({
    caseIds: idValidation.array().min(1),
  })
  .optional();

export type GetCasesProgressSchema = z.input<typeof getCasesProgressSchema>;
