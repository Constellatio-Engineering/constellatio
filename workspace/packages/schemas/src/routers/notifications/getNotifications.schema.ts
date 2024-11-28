import { z } from "zod";

import { idValidation } from "../../common/common.validation";

export const getNotificationsSchema = z.object({
  cursor: z.number().int().min(0).nullish(),
  notificationIds: z.array(idValidation).optional(),
  pageSize: z.number().min(1).max(50)
});

export type GetNotificationsSchema = z.input<typeof getNotificationsSchema>;
