import { idValidation } from "~/common/common.validation";

import { z } from "zod";

export const getNotificationsSchema = z.object({
  cursor: z.object({
    index: z.number().int().min(0).nullish()
  }),
  limit: z.number().min(1).max(50),
  notificationIds: z.array(idValidation).optional()
});

export type GetNotificationsSchema = z.input<typeof getNotificationsSchema>;
