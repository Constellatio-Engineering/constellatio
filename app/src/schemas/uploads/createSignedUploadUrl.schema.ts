import { fileExtensions } from "@/db/schema";
import { getFileExtensionLowercase } from "@/utils/files";

import { z } from "zod";

export const createSignedUploadUrlSchema = z
  .object({
    contentType: z.string(),
    fileSizeInBytes: z.number().int().min(1),
    filename: z.string().includes("."),
  })
  .refine(data => getFileExtensionLowercase(data.filename) != null, {
    message: "Der Dateiname muss eine Dateiendung haben.",
    path: ["filename"]
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
  });

export type CreateSignedUploadUrlSchema = z.input<typeof createSignedUploadUrlSchema>;
export type SignedUploadUrlSchema = z.output<typeof createSignedUploadUrlSchema>;
