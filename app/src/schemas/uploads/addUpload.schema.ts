import { folderIdValidation, idValidation, nameValidation } from "@/schemas/uploads/uploadedFile.validation";

import { z } from "zod";

export const addUploadSchema = z.object({
  fileSizeInBytes: z.number().int().min(1),
  folderId: folderIdValidation,
  id: idValidation,
  originalFilename: nameValidation,
  serverFilename: nameValidation
});

export type AddUploadSchema = z.input<typeof addUploadSchema>;
