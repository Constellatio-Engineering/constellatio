import { allBookmarkResourceTypes } from "@/db/schema";

import { z } from "zod";

export const addOrRemoveBookmarkSchema = z.object({
  resourceId: z.string().uuid(),
  resourceType: z.enum(allBookmarkResourceTypes),
});

export type AddOrRemoveBookmarkSchema = z.input<typeof addOrRemoveBookmarkSchema>;
