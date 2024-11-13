
import { contentItemViewsTypes } from "@constellatio/shared/validation";
import { z } from "zod";

import { idValidation } from "../../common/common.validation";

export const addContentItemViewSchema = z.object({
  itemId: idValidation,
  itemType: z.enum(contentItemViewsTypes),
});

export type AddContentItemViewSchema = z.input<typeof addContentItemViewSchema>;
