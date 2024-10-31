import { z } from "zod";

import { refCodeValidation } from "../../common/auth/userData.validation";

export const getReferralCountSchema = z.object({
  code: refCodeValidation,
});

export type GetReferralCountSchema = z.input<typeof getReferralCountSchema>;
