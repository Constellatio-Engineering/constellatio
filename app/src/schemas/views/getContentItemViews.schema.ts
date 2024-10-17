import { contentItemViewsTypes } from "@/db/schema";
import { idValidation } from "@/schemas/common.validation";

import { z } from "zod";

export const getContentItemViewsSchema = z.object({
  itemId: idValidation,
  itemType: z.enum(contentItemViewsTypes),
});

export type GetContentItemViewsSchema = z.input<typeof getContentItemViewsSchema>;
