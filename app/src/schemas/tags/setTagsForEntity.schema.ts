import { idValidation } from "@/schemas/common.validation";

import { z } from "zod";

export const setTagsForEntitySchema = z.object({
  entityId: idValidation,
  entityType: z.enum(["document", "file"]),
  tagIds: z.array(idValidation),
});

export type SetTagsForEntitySchema = z.input<typeof setTagsForEntitySchema>;
