
import { contentItemViewsTypes } from "@constellatio/shared/validation";
import { z } from "zod";

import { idValidation } from "../../common/common.validation";

export const getContentItemViewsSchema = z.object({
  itemId: idValidation,
  itemType: z.enum(contentItemViewsTypes),
});

export type GetContentItemViewsSchema = z.input<typeof getContentItemViewsSchema>;
