import { idValidation } from "@/schemas/common.validation";
import { filenameValidation, folderIdValidation } from "@/schemas/uploads/uploadedFile.validation";

import { z } from "zod";

export const updateUploadedFileSchema = z.object({
  id: idValidation,
  updatedValues: z.object({
    folderId: folderIdValidation.optional(),
    name: filenameValidation.optional(),
  }),
});

export type UpdateUploadedFileSchema = z.input<typeof updateUploadedFileSchema>;
