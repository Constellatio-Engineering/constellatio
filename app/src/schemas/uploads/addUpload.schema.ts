import { fileExtensions, fileMimeTypes } from "@/db/schema";
import { idValidation } from "@/schemas/common.validation";
import { filenameValidation, folderIdValidation, generateContentTypeValidation } from "@/schemas/uploads/uploadedFile.validation";

import { z } from "zod";

export const addUploadSchema = z.object({
  contentType: generateContentTypeValidation(fileMimeTypes),
  fileExtensionLowercase: z.enum(fileExtensions),
  fileSizeInBytes: z.number().int().min(1),
  folderId: folderIdValidation,
  id: idValidation,
  originalFilename: filenameValidation,
  serverFilename: filenameValidation,
});

export type AddUploadSchema = z.input<typeof addUploadSchema>;
