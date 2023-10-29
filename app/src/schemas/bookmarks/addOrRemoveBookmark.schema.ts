import { allBookmarkResourceTypes } from "@/db/schema";
import { idValidation } from "@/schemas/common.validation";

import { z } from "zod";

export const addOrRemoveBookmarkSchema = z.object({
  resourceId: idValidation,
  resourceType: z.enum(allBookmarkResourceTypes),
});

export type AddOrRemoveBookmarkSchema = z.input<typeof addOrRemoveBookmarkSchema>;
