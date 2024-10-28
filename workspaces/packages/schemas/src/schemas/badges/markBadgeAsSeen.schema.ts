import { idValidation } from "@/common/common.validation";
import { z } from "zod";

export const markBadgeAsSeenSchema = z.object({
  badgeId: idValidation,
});

export type MarkBadgeAsSeenSchema = z.input<typeof markBadgeAsSeenSchema>;
