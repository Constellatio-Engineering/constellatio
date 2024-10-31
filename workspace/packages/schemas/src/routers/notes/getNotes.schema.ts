import { z } from "zod";

import { idValidation } from "../../common/common.validation";

export const getNotesSchema = z.object({
  folderId: idValidation.nullable().optional()
});

export type GetNotesSchema = z.input<typeof getNotesSchema>;
