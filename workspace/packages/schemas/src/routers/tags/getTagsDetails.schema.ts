import { z } from "zod";

import { idValidation } from "../../common/common.validation";

export const getTagsDetailsSchema = z.object({
  tagIds: z.array(idValidation),
});

export type GetTagsDetailsSchema = z.input<typeof getTagsDetailsSchema>;
