import { emailValidation } from "@/schemas/auth/userData.validation";

import { z } from "zod";

export const loginFormSchema = z.object({
  email: emailValidation,
  password: z.string()
});
