import { idValidation } from "@/schemas/common.validation";

import { z } from "zod";

export const renameFolderSchema = z.object({
  folderId: idValidation,
  newName: z.string().min(1)
});

export type RenameFolderSchema = z.input<typeof renameFolderSchema>;
