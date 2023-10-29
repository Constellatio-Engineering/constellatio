import { maximumAmountOfSemesters } from "@/schemas/auth/registrationForm.schema";

import { z } from "zod";

export const updateUserDetailsSchema = z.object({
  firstName: z.string().min(2, { message: "Ein Vorname ist erforderlich" }),
  lastName: z.string().min(2, { message: "Ein Anzeigename ist erforderlich" }),
  profileName: z.string().min(2, { message: "Ein Anzeigename ist erforderlich" }),
  semester: z.string().pipe(z.coerce.number().int().min(1).max(maximumAmountOfSemesters)).optional(),
  university: z.string().min(1, { message: "Eine Uni ist erforderlich" }),
});

export type UpdateUserDetailsSchema = z.input<typeof updateUserDetailsSchema>;
