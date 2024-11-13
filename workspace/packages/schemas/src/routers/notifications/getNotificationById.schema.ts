import { z } from "zod";

import { idValidation } from "../../common/common.validation";

export const getNotificationByIdSchema = z.object({
  notificationId: idValidation,
});

export type GetNotificationByIdSchema = z.input<typeof getNotificationByIdSchema>;
