import { contentItemViewsTypes } from "@acme/shared-types";

import { z } from "zod";

export const getLastViewedContentItemsSchema = z.object({
  itemType: z.enum(contentItemViewsTypes),
});

export type GetLastViewedContentItemsSchema = z.input<typeof getLastViewedContentItemsSchema>;
