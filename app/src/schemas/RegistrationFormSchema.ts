import { allGenderIdentifiers } from "@/db/schema";

import { z } from "zod";

export const registrationFormSchema = z.object({
  acceptTOS: z.literal<boolean>(true, {
    errorMap: (_error) => ({ message: "Du musst zustimmen" }),
  }),
  displayName: z.string().min(2, { message: "Ein Anzeigename ist erforderlich" }),
  email: z.string().email({ message: "Ungültige E-Mail Adresse" }),
  firstName: z.string().min(2, { message: "Ein Vorname ist erforderlich" }),
  gender: z.enum(allGenderIdentifiers, {
    errorMap: (_issue, ctx) => ({ message: ctx.data == null ? "Ein Geschlecht ist erforderlich" : "Ungültiges Geschlecht" })
  }),
  lastName: z.string().min(2, { message: "Ein Anzeigename ist erforderlich" }),
  password: z.string().min(6, { message: "Passwörter haben mindestens 6 Zeichen" }),
  passwordConfirmation: z.string().min(6, { message: "Passwörter haben mindestens 6 Zeichen" }),
  semester: z.string().pipe(z.coerce.number().int({ message: "Kein Integer" }).min(1).max(15)).optional(),
  university: z.string().min(2, { message: "Eine Uni ist erforderlich" }),
});

export type RegistrationFormSchema = z.input<typeof registrationFormSchema>;
