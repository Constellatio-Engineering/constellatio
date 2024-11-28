import { z } from "zod";

import { emailValidation } from "../../common/auth/userData.validation";

export const loginFormSchema = z.object({
  email: emailValidation,
  password: z.string().min(1)
});

export type LoginFormSchema = z.input<typeof loginFormSchema>;
