import { z } from "zod";

import { idValidation } from "../../common/common.validation";

export const setNotificationReadStatusSchema = z.object({
  newStatus: z.enum(["read", "not-read"]),
  notificationId: idValidation,
});

export type SetNotificationReadStatusSchema = z.input<typeof setNotificationReadStatusSchema>;
