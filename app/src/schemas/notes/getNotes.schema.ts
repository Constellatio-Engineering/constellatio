import { idValidation } from "@/schemas/common.validation";

import { z } from "zod";

export const getNotesSchema = z.object({
  folderId: idValidation.nullable()
});

export type GetNotesSchema = z.input<typeof getNotesSchema>;
