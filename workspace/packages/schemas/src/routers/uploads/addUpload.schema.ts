import { fileExtensions, fileMimeTypes } from "@constellatio/shared/validation";
import { z } from "zod";

import { idValidation } from "../../common/common.validation";
import { filenameValidation, folderIdValidation, generateContentTypeValidation } from "../../common/uploads/uploadedFile.validation";

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
