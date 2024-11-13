
import { imageFileExtensions, type ImageFileMimeType, imageFileMimeTypes } from "@constellatio/shared/validation";
import { z } from "zod";

import { idValidation } from "../../common/common.validation";

// this is a limitation of typescript. A string should be comparable to a string union, but it's not.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidMimeType = (value: string): value is ImageFileMimeType => imageFileMimeTypes.includes(value as any);

export const setProfilePictureSchema = z.object({
  contentType: z
    .string()
    .refine(isValidMimeType, {
      message: `Der Dateityp ist nicht erlaubt. Erlaubte Dateitypen: ${imageFileMimeTypes.join(", ")}`,
    }),
  fileExtensionLowercase: z.enum(imageFileExtensions),
  id: idValidation,
  serverFilename: z.string(),
});

export type SetProfilePictureSchema = z.input<typeof setProfilePictureSchema>;
