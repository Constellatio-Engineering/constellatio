import { idValidation } from "@/schemas/common.validation";

import { z } from "zod";

export const deleteNoteSchema = z.object({
  fileId: idValidation
});

export type DeleteNoteSchema = z.input<typeof deleteNoteSchema>;
