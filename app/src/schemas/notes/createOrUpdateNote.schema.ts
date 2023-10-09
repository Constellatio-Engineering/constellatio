import { idValidation } from "@/schemas/documents/document.validation";

import { z } from "zod";

export const createOrUpdateNoteSchema = z.object({
  content: z.string(),
  fileId: idValidation
});

export type CreateOrUpdateNoteSchema = z.input<typeof createOrUpdateNoteSchema>;
