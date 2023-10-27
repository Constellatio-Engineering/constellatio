import { type FileMimeType, fileMimeTypes } from "@/db/schema";
import { getFileExtensionLowercase } from "@/utils/files";

import { z } from "zod";

export const idValidation = z.string().uuid();
export const folderIdValidation = z.string().uuid().nullable();
export const filenameValidation = z.string().min(1).max(255).refine(filename => getFileExtensionLowercase(filename) != null, {
  message: "Der Dateiname muss eine Dateiendung haben.",
  path: ["filename"]
});

export const contentTypeValidationOld = z.enum(fileMimeTypes);
export const contentTypeValidation = z
  .string()
  .refine(contentType => fileMimeTypes.includes(contentType), {
    message: `Der Dateityp ist nicht erlaubt. Erlaubte Dateitypen: ${fileMimeTypes.join(", ")}`,
  })
  .transform(contentType => contentType as FileMimeType);
