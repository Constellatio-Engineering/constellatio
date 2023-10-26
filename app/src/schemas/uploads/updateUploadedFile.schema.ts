import { folderIdValidation, idValidation, nameValidation } from "@/schemas/uploads/uploadedFile.validation";

import { z } from "zod";

export const updateUploadedFileSchema = z.object({
  id: idValidation,
  updatedValues: z.object({
    folderId: folderIdValidation.optional(),
    name: nameValidation.optional(),
  }),
});

export type UpdateUploadedFileSchema = z.input<typeof updateUploadedFileSchema>;
