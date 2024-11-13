import { z } from "zod";

import { emailValidation, nameValidation, passwordSchema, refCodeValidation } from "../../common/auth/userData.validation";

export const registrationFormMinimalSchema = z
  .object({
    displayName: nameValidation,
    email: emailValidation,
    password: passwordSchema,
    refCode: refCodeValidation.optional(),
  });

export type RegistrationFormMinimalSchema = z.input<typeof registrationFormMinimalSchema>;
