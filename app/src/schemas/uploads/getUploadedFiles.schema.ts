import { idValidation } from "@/schemas/common.validation";

import { z } from "zod";

export const getUploadedFilesSchema = z.object({
  fileId: idValidation.optional(),
  folderId: idValidation.nullable(),
});

export type GetUploadedFilesSchema = z.input<typeof getUploadedFilesSchema>;
