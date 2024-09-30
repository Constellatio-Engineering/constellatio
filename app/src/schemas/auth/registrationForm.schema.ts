import {
  emailValidation, genderValidation, nameValidation, passwordSchema, refCodeValidation, semesterValidation, universityValidation 
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
    gender: genderValidation.nullable(),
    lastName: nameValidation,
    password: passwordSchema,
    passwordConfirmation: passwordSchema,
    refCode: refCodeValidation.nullable(),
    semester: semesterValidation.nullable(),
    university: universityValidation.nullable(),
  })
  .refine(data => data.passwordConfirmation === data.password, {
    message: "Die Passwörter stimmen nicht überein",
    path: ["passwordConfirmation"]
  });

export type RegistrationFormSchema = z.input<typeof registrationFormSchema>;
