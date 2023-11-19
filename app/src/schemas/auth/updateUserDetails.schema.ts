import { emailValidation, nameValidation, semesterValidation, universityValidation } from "@/schemas/auth/userData.validation";

import { z } from "zod";

export const updateUserDetailsSchema = z.object({
  displayName: nameValidation.optional(),
  email: emailValidation.optional(),
  firstName: nameValidation.optional(),
  lastName: nameValidation.optional(),
  semester: semesterValidation.nullable().optional(),
  university: universityValidation.nullable().optional(),
});

export type UpdateUserDetailsSchema = z.input<typeof updateUserDetailsSchema>;
