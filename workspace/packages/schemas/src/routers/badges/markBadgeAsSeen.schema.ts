import { z } from "zod";

import { idValidation } from "../../common/common.validation";

export const markBadgeAsSeenSchema = z.object({
  badgeId: idValidation,
});

export type MarkBadgeAsSeenSchema = z.input<typeof markBadgeAsSeenSchema>;
