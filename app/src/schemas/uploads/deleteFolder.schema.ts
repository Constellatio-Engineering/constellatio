import { z } from "zod";

export const deleteFolderSchema = z.object({
  folderId: z.string().uuid()
});

export type DeleteFolderSchema = z.input<typeof deleteFolderSchema>;
