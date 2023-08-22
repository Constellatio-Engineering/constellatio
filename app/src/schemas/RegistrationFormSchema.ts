import { z } from "zod";

export const registrationFormSchema = z.object({
  acceptTOS: z.literal<boolean>(true, {
    errorMap: (_error) => ({ message: "Du musst zustimmen" }),
  }),
  displayName: z.string().min(2, { message: "Ein Anzeigename ist erforderlich" }),
  email: z.string().email({ message: "Ungültige E-Mail Adresse" }),
  firstName: z.string().min(2, { message: "Ein Vorname ist erforderlich" }),
  gender: z.string().min(2, { message: "Ein Geschlecht ist erforderlich" }),
  lastName: z.string().min(2, { message: "Ein Anzeigename ist erforderlich" }),
  password: z.string().min(6, { message: "Passwörter haben mindestens 6 Zeichen" }),
  passwordConfirmation: z.string().min(6, { message: "Passwörter haben mindestens 6 Zeichen" }),
  semester: z.number().min(1).max(32).optional(),
  university: z.string().min(2, { message: "Eine Uni ist erforderlich" }),
});
