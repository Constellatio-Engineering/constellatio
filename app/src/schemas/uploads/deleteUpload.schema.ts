import { z } from "zod";

export const deleteUploadSchema = z.object({
  fileId: z.string().uuid(),
});

export type DeleteUploadSchema = z.input<typeof deleteUploadSchema>;
