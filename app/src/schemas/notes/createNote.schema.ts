import { idValidation } from "@/schemas/documents/document.validation";

import { z } from "zod";

export const createNoteSchema = z.object({
  content: z.string(),
  fileId: idValidation,
  id: idValidation,
});

export type CreateNoteSchema = z.input<typeof createNoteSchema>;
