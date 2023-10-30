import { nameValidation, semesterValidation, universityValidation } from "@/schemas/auth/userData.validation";

import { z } from "zod";

export const updateUserDetailsSchema = z.object({
  firstName: nameValidation.optional(),
  lastName: nameValidation.optional(),
  profileName: nameValidation.optional(),
  semester: semesterValidation.optional(),
  university: universityValidation.nullable(),
});

export type UpdateUserDetailsSchema = z.input<typeof updateUserDetailsSchema>;
