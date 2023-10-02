import { z } from "zod";

export const getUploadedFilesSchema = z.object({
  folderId: z.string().uuid().nullable()
});

export type GetUploadedFilesSchema = z.input<typeof getUploadedFilesSchema>;
