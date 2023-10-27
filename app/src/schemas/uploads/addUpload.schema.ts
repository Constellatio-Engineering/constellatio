import { fileExtensions } from "@/db/schema";
import { contentTypeValidation, filenameValidation, folderIdValidation, idValidation } from "@/schemas/uploads/uploadedFile.validation";

import { z } from "zod";

export const addUploadSchema = z.object({
  contentType: contentTypeValidation,
  fileExtensionLowercase: z.enum(fileExtensions),
  fileSizeInBytes: z.number().int().min(1),
  folderId: folderIdValidation,
  id: idValidation,
  originalFilename: filenameValidation,
  serverFilename: filenameValidation,
});

export type AddUploadSchema = z.input<typeof addUploadSchema>;
