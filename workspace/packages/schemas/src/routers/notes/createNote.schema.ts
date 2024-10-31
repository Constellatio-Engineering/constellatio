import { z } from "zod";

import { idValidation } from "../../common/common.validation";

export const createNoteSchema = z.object({
  content: z.string(),
  fileId: idValidation,
  id: idValidation,
});

export type CreateNoteSchema = z.input<typeof createNoteSchema>;
