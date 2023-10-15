import { idValidation } from "@/schemas/documents/document.validation";

import { z } from "zod";

export const getCaseProgressSchema = z
  .object({
    caseId: idValidation,
  });

export type GetCaseProgressSchema = z.input<typeof getCaseProgressSchema>;
