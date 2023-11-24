import { emailValidation } from "@/schemas/auth/userData.validation";

import { z } from "zod";

export const resetPasswordFormSchema = z.object({
  email: emailValidation,
});

export type ResetPasswordFormSchema = z.input<typeof resetPasswordFormSchema>;
