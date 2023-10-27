import { type FileExtension, fileExtensions } from "@/db/schema";
import { env } from "@/env.mjs";
import { contentTypeValidation, filenameValidation } from "@/schemas/uploads/uploadedFile.validation";
import { getFileExtensionLowercase } from "@/utils/files";

import { z } from "zod";

export const createSignedUploadUrlSchema = z
  .object({
    contentType: contentTypeValidation,
    fileSizeInBytes: z.number().int().min(1).max(env.NEXT_PUBLIC_MAXIMUM_FILE_UPLOAD_SIZE_IN_MB * 1_000_000),
    filename: filenameValidation,
  })
  .transform((data) => ({
    ...data,
    fileExtensionLowercase: getFileExtensionLowercase(data.filename)
  }))
  .refine(({ fileExtensionLowercase }) =>
  {
    return fileExtensionLowercase && fileExtensions.map(ext => ext.toLowerCase()).includes(fileExtensionLowercase);
  }, {
    message: `Die Dateiendung ist nicht erlaubt. Erlaubte Dateiendungen: ${fileExtensions.join(", ")}`,
    path: ["filename"],
  })
  .transform((data) => ({
    ...data,
    fileExtensionLowercase: data.fileExtensionLowercase as FileExtension
  }))
;

export type CreateSignedUploadUrlSchema = z.input<typeof createSignedUploadUrlSchema>;
export type UploadableFile = z.output<typeof createSignedUploadUrlSchema>;
