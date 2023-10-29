import { idValidation } from "@/schemas/common.validation";

import { z } from "zod";

export const getCaseViewsSchema = z.object({
  caseId: idValidation,
});

export type GetCaseViewsSchema = z.input<typeof getCaseViewsSchema>;
