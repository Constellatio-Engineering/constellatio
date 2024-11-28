import { z } from "zod";

import { idValidation } from "../../common/common.validation";

export const renameFolderSchema = z.object({
  folderId: idValidation,
  newName: z.string().min(1)
});

export type RenameFolderSchema = z.input<typeof renameFolderSchema>;
