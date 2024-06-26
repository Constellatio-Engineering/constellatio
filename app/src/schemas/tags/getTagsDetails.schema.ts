import { idValidation } from "@/schemas/common.validation";

import { z } from "zod";

export const getTagsDetailsSchema = z.object({
  tagIds: z.array(idValidation),
});

export type GetTagsDetailsSchema = z.input<typeof getTagsDetailsSchema>;
