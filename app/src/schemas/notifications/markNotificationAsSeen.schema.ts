import { idValidation } from "@/schemas/common.validation";

import { z } from "zod";

export const markNotificationAsSeenSchema = z.object({
  notificationId: idValidation,
});

export type MarkNotificationAsSeenSchema = z.input<typeof markNotificationAsSeenSchema>;
