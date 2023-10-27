/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type FileMimeType } from "@/db/schema";
import { getFileExtensionLowercase } from "@/utils/files";

import { z } from "zod";

export const idValidation = z.string().uuid();
export const folderIdValidation = z.string().uuid().nullable();
export const filenameValidation = z.string().min(1).max(255).refine(filename => getFileExtensionLowercase(filename) != null, {
  message: "Der Dateiname muss eine Dateiendung haben.",
  path: ["filename"]
});

export const generateContentTypeValidation = <T extends FileMimeType>(mimeTypes: readonly T[]) => z
  .string()
  .refine(contentType => mimeTypes.includes(contentType as T), {
    message: `Der Dateityp ist nicht erlaubt. Erlaubte Dateitypen: ${mimeTypes.join(", ")}`,
  })
  .transform(contentType => contentType as T);
