import { emailValidation, passwordSchema } from "~/common/auth/userData.validation";

import { z } from "zod";

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(8),
    email: emailValidation,
    newPassword: passwordSchema,
    newPasswordConfirm: passwordSchema,
  })
  .refine(data => data.newPassword === data.newPasswordConfirm, {
    message: "Die Passwörter stimmen nicht überein",
    path: ["newPasswordConfirm"]
  });

export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;
export type UpdatePasswordValues = z.output<typeof updatePasswordSchema>;
