import { z } from "zod";

export const getNotesSchema = z.object({
  folderId: z.string().uuid().nullable()
});

export type GetNotesSchema = z.input<typeof getNotesSchema>;
