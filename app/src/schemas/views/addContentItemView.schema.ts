import { contentItemViewsTypes } from "@/db/schema";
import { idValidation } from "@/schemas/common.validation";

import { z } from "zod";

export const addContentItemViewSchema = z.object({
  itemId: idValidation,
  itemType: z.enum(contentItemViewsTypes),
});

export type AddContentItemViewSchema = z.input<typeof addContentItemViewSchema>;
