import { z } from "zod";

export const addUploadSchema = z.object({
  fileSizeInBytes: z.number().int().min(1),
  folderId: z.string().uuid().nullable(),
  id: z.string().uuid(),
  originalFilename: z.string(),
  serverFilename: z.string()
});

export type AddUploadSchema = z.input<typeof addUploadSchema>;
