
import { idValidation } from "~/common/common.validation";
import { filenameValidation, folderIdValidation } from "~/common/uploads/uploadedFile.validation";

import { z } from "zod";

export const updateUploadedFileSchema = z.object({
  id: idValidation,
  updatedValues: z.object({
    folderId: folderIdValidation.optional(),
    name: filenameValidation.optional(),
  }),
});

export type UpdateUploadedFileSchema = z.input<typeof updateUploadedFileSchema>;
