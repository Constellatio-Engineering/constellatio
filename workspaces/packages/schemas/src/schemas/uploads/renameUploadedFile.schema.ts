import { idValidation } from "@/common/common.validation";

import { z } from "zod";

// TODO: Check if filename has appropriate extension

export const renameUploadedFile = z.object({
  id: idValidation,
  newFilename: z.string().min(1).max(255),
});

export type RenameUploadedFileSchema = z.input<typeof renameUploadedFile>;
