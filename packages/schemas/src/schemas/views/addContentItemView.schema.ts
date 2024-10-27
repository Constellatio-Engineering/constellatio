import { contentItemViewsTypes } from "@acme/shared-types";
import { idValidation } from "@/common/common.validation";

import { z } from "zod";

export const addContentItemViewSchema = z.object({
  itemId: idValidation,
  itemType: z.enum(contentItemViewsTypes),
});

export type AddContentItemViewSchema = z.input<typeof addContentItemViewSchema>;
