import { allBookmarkResourceTypes } from "@constellatio/shared-types";
import { idValidation } from "@/common/common.validation";

import { z } from "zod";

export const addOrRemoveBookmarkSchema = z.object({
  resourceId: idValidation,
  resourceType: z.enum(allBookmarkResourceTypes),
});

export type AddOrRemoveBookmarkSchema = z.input<typeof addOrRemoveBookmarkSchema>;
