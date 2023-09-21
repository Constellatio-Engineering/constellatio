import { z } from "zod";

export const addUploadSchema = z.object({
  clientSideUuid: z.string(),
  fileSizeInBytes: z.number().int().min(1),
  filename: z.string(),
  originalFilename: z.string(),
});

export type AddUploadSchema = z.input<typeof addUploadSchema>;
