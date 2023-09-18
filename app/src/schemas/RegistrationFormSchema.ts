import { allGenderIdentifiers } from "@/db/schema";

import { z } from "zod";

export const passwordRequirements = [
  { label: "Mindestens 8 Zeichen", re: /.{8,}/ },
  { label: "Mindestens 1 Ziffer", re: /[0-9]/ },
  { label: "Mindestens 1 Großbuchstaben", re: /[A-Z]/ },
  { label: "Mindestens 1 Kleinbuchstaben", re: /[a-z]/ },
  { label: "Mindestens 1 Sonderzeichen: ! # $ & ( ) * + - = . , / ? @ { } [ ] ^ _ ~", re: /[!#$&()*+,-.=/?@{}[\]^_~]/ },
];

const passwordSchema = z.string().refine(password => passwordRequirements.every(r => r.re.test(password)), {
  message: "Password doesn't meet the requirements",
});

export const maximumAmountOfSemesters = 15 as const;

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
  password: passwordSchema,
  passwordConfirmation: passwordSchema,
  semester: z.string().pipe(z.coerce.number().int().min(1).max(maximumAmountOfSemesters)).optional(),
  university: z.string().min(1, { message: "Eine Uni ist erforderlich" }),
}).refine(data => data.passwordConfirmation === data.password, {
  message: "Die Passwörter stimmen nicht überein",
  path: ["passwordConfirmation"]
});

export type RegistrationFormSchema = z.input<typeof registrationFormSchema>;
