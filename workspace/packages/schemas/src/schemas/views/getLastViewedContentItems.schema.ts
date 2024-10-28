import { contentItemViewsTypes } from "@constellatio/shared/validation";

import { z } from "zod";

export const getLastViewedContentItemsSchema = z.object({
  itemType: z.enum(contentItemViewsTypes),
});

export type GetLastViewedContentItemsSchema = z.input<typeof getLastViewedContentItemsSchema>;
