import { contentItemViewsTypes } from "@constellatio/shared/validation";
import { idValidation } from "@/common/common.validation";

import { z } from "zod";

export const getContentItemViewsSchema = z.object({
  itemId: idValidation,
  itemType: z.enum(contentItemViewsTypes),
});

export type GetContentItemViewsSchema = z.input<typeof getContentItemViewsSchema>;
