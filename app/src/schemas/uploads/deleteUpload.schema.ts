import { z } from "zod";

export const deleteUploadSchema = z.object({
  fileIds: z.string().uuid().array().nonempty(),
});

export type DeleteUploadSchema = z.input<typeof deleteUploadSchema>;
