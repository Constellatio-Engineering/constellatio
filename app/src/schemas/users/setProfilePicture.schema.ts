import { imageFileExtensions, type ImageFileMimeType, imageFileMimeTypes } from "@/db/schema";
import { idValidation } from "@/schemas/common.validation";

import { z } from "zod";

export const setProfilePictureSchema = z.object({
  contentType: z
    .string()
    .refine(contentType => imageFileMimeTypes.includes(contentType), {
      message: `Der Dateityp ist nicht erlaubt. Erlaubte Dateitypen: ${imageFileMimeTypes.join(", ")}`,
    })
    .transform(contentType => contentType as ImageFileMimeType),
  fileExtensionLowercase: z.enum(imageFileExtensions),
  id: idValidation,
  serverFilename: z.string(),
});

export type SetProfilePictureSchema = z.input<typeof setProfilePictureSchema>;
