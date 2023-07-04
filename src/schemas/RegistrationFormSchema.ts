import { z } from "zod";

export const registrationFormSchema = z.object({
  firstName: z.string().min(2, { message: "Ein Vorname ist erforderlich" }),
  lastName: z.string().min(2, { message: "Ein Anzeigename ist erforderlich" }),
  displayName: z
    .string()
    .min(2, { message: "Ein Anzeigename ist erforderlich" }),
  email: z.string().email({ message: "Ungültige E-Mail Adresse" }),
  password: z
    .string()
    .min(6, { message: "Passwörter haben mindestens 6 Zeichen" }),
  passwordConfirmation: z
    .string()
    .min(6, { message: "Passwörter haben mindestens 6 Zeichen" }),
  university: z.string().min(2, { message: "Eine Uni ist erforderlich" }),
  semester: z.number().min(1).max(32),
  gender: z.string().min(2, { message: "Ein Geschlecht ist erforderlich" }),
  acceptTOS: z.literal<boolean>(true, {
    errorMap: (error) => ({ message: "Du musst zustimmen" }),
  }),
});
