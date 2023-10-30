import { emailValidation } from "@/schemas/auth/userData.validation";

import { z } from "zod";

export const updateEmailSchema = z.object({
  newEmail: emailValidation,
});

export type UpdateEmailSchema = z.input<typeof updateEmailSchema>;
