import {
  displayNameValidation, emailValidation, genderValidation, optionalNameValidation, semesterValidation, universityValidation
} from "@/common/auth/userData.validation";

import { z } from "zod";

export const updateUserDetailsSchema = z.object({
  displayName: displayNameValidation.optional(),
  email: emailValidation.optional(),
  firstName: optionalNameValidation.optional(),
  gender: genderValidation.nullable().optional(),
  lastName: optionalNameValidation.optional(),
  semester: semesterValidation.nullable().optional(),
  university: universityValidation.nullable().optional(),
});

export type UpdateUserDetailsSchema = z.input<typeof updateUserDetailsSchema>;
