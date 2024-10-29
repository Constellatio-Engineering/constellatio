import { refCodeValidation } from "~/common/auth/userData.validation";

import { z } from "zod";

export const getReferralCountSchema = z.object({
  code: refCodeValidation,
});

export type GetReferralCountSchema = z.input<typeof getReferralCountSchema>;
