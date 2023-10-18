import { allGameProgressStates } from "@/db/schema";
import { idValidation } from "@/schemas/documents/document.validation";

import { z } from "zod";

export const setGameProgressStateSchema = z.object({
  gameId: idValidation,
  progressState: z.enum(allGameProgressStates),
});

export type SetGameProgressStateSchema = z.input<typeof setGameProgressStateSchema>;
