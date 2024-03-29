import { idValidation } from "@/schemas/common.validation";

import { z } from "zod";

export const getNotificationByIdSchema = z.object({
  notificationId: idValidation,
});

export type GetNotificationByIdSchema = z.input<typeof getNotificationByIdSchema>;
