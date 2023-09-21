import { z } from "zod";

export const deleteUploadSchema = z.object({
  fileUuid: z.string().uuid(),
});

export type DeleteUploadSchema = z.input<typeof deleteUploadSchema>;
