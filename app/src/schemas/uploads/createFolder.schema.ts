import { z } from "zod";

export const createFolderSchema = z.object({
  name: z.string()
});

export type AddUploadSchema = z.input<typeof createFolderSchema>;
