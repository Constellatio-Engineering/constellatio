import {
  emailValidation,
  genderValidation,
  nameValidation,
  passwordSchema,
  semesterValidation,
  universityValidation
} from "@/schemas/auth/userData.validation";

import { z } from "zod";

export const registrationFormSchema = z
  .object({
    acceptTOS: z.literal<boolean>(true, {
      errorMap: (_error) => ({ message: "Du musst zustimmen" }),
    }),
    displayName: nameValidation,
    email: emailValidation,
    firstName: nameValidation,
    gender: genderValidation,
    lastName: nameValidation,
    password: passwordSchema,
    passwordConfirmation: passwordSchema,
    semester: semesterValidation.optional(),
    university: universityValidation,
  })
  .refine(data => data.passwordConfirmation === data.password, {
    message: "Die Passwörter stimmen nicht überein",
    path: ["passwordConfirmation"]
  });

export type RegistrationFormSchema = z.input<typeof registrationFormSchema>;
