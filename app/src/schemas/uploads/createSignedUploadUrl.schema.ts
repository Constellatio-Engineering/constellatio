/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type FileExtension, type FileMimeType } from "@/db/schema";
import { env } from "@/env.mjs";
import { filenameValidation, generateContentTypeValidation } from "@/schemas/uploads/uploadedFile.validation";
import { getFileExtensionLowercase } from "@/utils/files";

import { z } from "zod";

export const generateCreateSignedUploadUrlSchema = <T extends FileExtension, U extends FileMimeType>(
  fileExtensions: readonly T[],
  fileMimeTypes: readonly U[]
) => z
  .object({
    contentType: generateContentTypeValidation(fileMimeTypes),
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
    fileExtensionLowercase: data.fileExtensionLowercase as T,
  }));

export type CreateSignedUploadUrlSchema = z.input<ReturnType<typeof generateCreateSignedUploadUrlSchema>>;
export type UploadableFile<T extends FileExtension, U extends FileMimeType> = z.output<ReturnType<typeof generateCreateSignedUploadUrlSchema<T, U>>>;
