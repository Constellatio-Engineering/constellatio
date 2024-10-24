import { emailValidation, nameValidation, passwordSchema, refCodeValidation } from "@/schemas/auth/userData.validation";

import { z } from "zod";

export const registrationFormMinimalSchema = z
  .object({
    displayName: nameValidation,
    email: emailValidation,
    password: passwordSchema,
    refCode: refCodeValidation.optional(),
  });

export type RegistrationFormMinimalSchema = z.input<typeof registrationFormMinimalSchema>;
