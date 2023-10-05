import { z } from "zod";

export const renameFolderSchema = z.object({
  folderId: z.string().uuid(),
  newName: z.string().min(1)
});

export type RenameFolderSchema = z.input<typeof renameFolderSchema>;
