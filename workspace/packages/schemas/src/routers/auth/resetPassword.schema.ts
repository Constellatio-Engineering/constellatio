import { z } from "zod";

import { emailValidation } from "../../common/auth/userData.validation";

export const resetPasswordFormSchema = z.object({
  email: emailValidation,
});

export type ResetPasswordFormSchema = z.input<typeof resetPasswordFormSchema>;
