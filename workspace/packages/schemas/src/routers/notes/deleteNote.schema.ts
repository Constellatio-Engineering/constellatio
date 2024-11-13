import { z } from "zod";

import { idValidation } from "../../common/common.validation";

export const deleteNoteSchema = z.object({
  fileId: idValidation
});

export type DeleteNoteSchema = z.input<typeof deleteNoteSchema>;
