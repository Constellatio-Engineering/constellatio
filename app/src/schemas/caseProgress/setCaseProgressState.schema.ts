import { allCaseProgressStates } from "@/db/schema";
import { idValidation } from "@/schemas/common.validation";

import { z } from "zod";

export const setCaseProgressStateSchema = z.object({
  caseId: idValidation,
  progressState: z.enum(allCaseProgressStates),
});

export type SetCaseProgressStateSchema = z.input<typeof setCaseProgressStateSchema>;
