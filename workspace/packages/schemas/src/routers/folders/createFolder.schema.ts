import { z } from "zod";

export const createFolderSchema = z.object({
  name: z.string()
});

export type CreateFolderSchema = z.input<typeof createFolderSchema>;
