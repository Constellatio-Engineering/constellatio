import { z } from "zod";

export const getUploadedFilesSchema = z.object({
  fileId: z.string().uuid().optional(),
  folderId: z.string().uuid().nullable(),
});

export type GetUploadedFilesSchema = z.input<typeof getUploadedFilesSchema>;
