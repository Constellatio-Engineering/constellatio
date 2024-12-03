import { z } from "zod";

import { idValidation } from "../../common/common.validation";

export const deleteFlashcardSchema = z.object({
  id: idValidation,
});

export type DeleteFlashcardSchema = z.input<typeof deleteFlashcardSchema>;
