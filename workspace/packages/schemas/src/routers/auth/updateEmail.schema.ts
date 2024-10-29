import { emailValidation } from "~/common/auth/userData.validation";

import { z } from "zod";

export const updateEmailSchema = z
  .object({
    currentEmail: emailValidation,
    newEmail: emailValidation,
  })
  .refine(data => data.newEmail !== data.currentEmail, {
    message: "Die neue E-Mail Adresse darf nicht mit der aktuellen E-Mail Adresse übereinstimmen.",
    path: ["newEmail"]
  });

export type UpdateEmailSchema = z.input<typeof updateEmailSchema>;
