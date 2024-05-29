import { idValidation } from "@/schemas/common.validation";

import { z } from "zod";

export const setTagsForConstellatioDocSchema = z.object({
  docId: idValidation,
  tagIds: z.array(idValidation),
});

export type SetTagsForConstellatioDocSchema = z.input<typeof setTagsForConstellatioDocSchema>;
