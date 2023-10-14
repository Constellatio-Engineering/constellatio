import { passwordSchema } from "@/schemas/auth/registrationForm.schema";

import { z } from "zod";

export const updatePasswordFormSchema = z
  .object({
    password: passwordSchema,
    passwordConfirm: z.string(),
  })
  .refine(data => data.passwordConfirm === data.password, {
    message: "Die Passwörter stimmen nicht überein",
    path: ["passwordConfirm"]
  });

export type UpdatePasswordFormSchema = z.input<typeof updatePasswordFormSchema>;
