/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type FileMimeType } from "@constellatio/shared/validation";
import { getFileExtensionLowercase } from "@constellatio/utils/files";
import { z } from "zod";

import { idValidation } from "../common.validation";

export const folderIdValidation = idValidation.nullable();
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
