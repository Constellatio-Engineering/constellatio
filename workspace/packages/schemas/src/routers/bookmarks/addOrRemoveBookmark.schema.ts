
import { allBookmarkResourceTypes } from "@constellatio/shared/validation";
import { z } from "zod";

import { idValidation } from "../../common/common.validation";

export const addOrRemoveBookmarkSchema = z.object({
  resourceId: idValidation,
  resourceType: z.enum(allBookmarkResourceTypes),
});

export type AddOrRemoveBookmarkSchema = z.input<typeof addOrRemoveBookmarkSchema>;
