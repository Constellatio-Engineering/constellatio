import { allBookmarkResourceTypes } from "@/db/schema";

import { z } from "zod";

export const addBookmarkSchema = z.object({
  resourceId: z.string().uuid(),
  resourceType: z.enum(allBookmarkResourceTypes),
});
