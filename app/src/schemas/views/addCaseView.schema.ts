import { idValidation } from "@/schemas/common.validation";

import { z } from "zod";

export const addCaseViewSchema = z.object({
  caseId: idValidation,
});

export type AddCaseViewSchema = z.input<typeof addCaseViewSchema>;
