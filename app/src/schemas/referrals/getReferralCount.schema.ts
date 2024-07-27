import { z } from "zod";

import { refCodeValidation } from "../auth/userData.validation";

export const getReferralCountSchema = z.object({
  code: refCodeValidation,
});

export type GetReferralCountSchema = z.input<typeof getReferralCountSchema>;
