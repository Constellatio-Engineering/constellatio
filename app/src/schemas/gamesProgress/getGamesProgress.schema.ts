import { idValidation } from "@/schemas/documents/document.validation";

import { z } from "zod";

export const getGamesProgressSchema = z.object({
  caseId: idValidation
});

export type GetGamesProgressSchema = z.input<typeof getGamesProgressSchema>;
