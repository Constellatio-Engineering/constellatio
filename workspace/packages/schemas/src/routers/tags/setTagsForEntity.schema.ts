import { idValidation } from "~/common/common.validation";

import { type SearchIndexType } from "@constellatio/shared/validation";
import { z } from "zod";

const allowedEntityTypes: [SearchIndexType, ...SearchIndexType[]] = ["user-documents", "user-uploads"];

export const setTagsForEntitySchema = z.object({
  entityId: idValidation,
  entityType: z.enum(allowedEntityTypes),
  tagIds: z.array(idValidation),
});

export type SetTagsForEntitySchema = z.input<typeof setTagsForEntitySchema>;