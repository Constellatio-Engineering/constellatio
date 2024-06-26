import { type SearchIndexType } from "@/db/schema";
import { idValidation } from "@/schemas/common.validation";

import { z } from "zod";

const allowedEntityTypes: [SearchIndexType, ...SearchIndexType[]] = ["user-documents", "user-uploads"];

export const setTagsForEntitySchema = z.object({
  entityId: idValidation,
  entityType: z.enum(allowedEntityTypes),
  tagIds: z.array(idValidation),
});

export type SetTagsForEntitySchema = z.input<typeof setTagsForEntitySchema>;
