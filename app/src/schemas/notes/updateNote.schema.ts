import { idValidation } from "@/schemas/documents/document.validation";

import { z } from "zod";

export const updateNoteSchema = z.object({
  fileId: idValidation,
  updatedValues: z.object({
    content: z.string().optional(),
  })
});

export type UpdateNoteSchema = z.input<typeof updateNoteSchema>;
