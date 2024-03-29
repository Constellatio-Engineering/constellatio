import { idValidation } from "@/schemas/common.validation";

import { z } from "zod";

export const getCaseProgressSchema = z
  .object({
    caseId: idValidation,
  });

export type GetCaseProgressSchema = z.input<typeof getCaseProgressSchema>;
