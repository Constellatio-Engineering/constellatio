import { allGenderIdentifiers, type GenderIdentifier } from "@/db/schema";

import { z } from "zod";

export const passwordRequirements = [
  { label: "Mindestens 8 Zeichen", re: /.{8,}/ },
  { label: "Mindestens 1 Ziffer", re: /[0-9]/ },
  { label: "Mindestens 1 Großbuchstaben", re: /[A-Z]/ },
  { label: "Mindestens 1 Kleinbuchstaben", re: /[a-z]/ },
  { label: "Mindestens 1 Sonderzeichen: ? ! $ & @ #", re: /[!#$&()*+,-.=/?@{}[\]^_~]/ },
];

export const allUniversities = [
  "Albert-Ludwigs-Universität Freiburg",
  "Bucerius Law School",
  "Christian-Albrechts-Universität zu Kiel",
  "EBS Universität für Wirtschaft und Recht",
  "Eberhard Karls Universität Tübingen",
  "Europa-Universität Viadrina Frankfurt (Oder)",
  "Fernuniversität in Hagen",
  "Freie Universität Berlin",
  "Friedrich-Alexander-Universität Erlangen-Nürnberg",
  "Friedrich-Schiller-Universität Jena",
  "Georg-August-Universität Göttingen",
  "Gottfried Wilhelm Leibniz Universität Hannover",
  "Heinrich-Heine-Universität Düsseldorf",
  "Humboldt-Universität zu Berlin",
  "Johann-Wolfgang-Goethe-Universität Frankfurt am Main",
  "Johannes Gutenberg-Universität Mainz",
  "Julius-Maximilians-Universität Würzburg",
  "Justus-Liebig-Universität Gießen",
  "Ludwig-Maximilians-Universität München",
  "Martin-Luther-Universität Halle-Wittenberg",
  "Philipps-Universität Marburg",
  "Rheinische Friedrich-Wilhelms-Universität Bonn",
  "Ruhr-Universität Bochum",
  "Ruprecht-Karls-Universität Heidelberg",
  "Universität Augsburg",
  "Universität Bayreuth",
  "Universität Bielefeld",
  "Universität Bremen",
  "Universität Greifswald",
  "Universität Hamburg",
  "Universität Konstanz",
  "Universität Leipzig",
  "Universität Mannheim",
  "Universität Osnabrück",
  "Universität Passau",
  "Universität Potsdam",
  "Universität Regensburg",
  "Universität Trier",
  "Universität des Saarlandes",
  "Universität zu Köln",
  "Westfälische Wilhelms-Universität Münster",
] as const;

export type University = typeof allUniversities[number];

export const maximumAmountOfSemesters = 15 as const;
export const nameValidation = z.string().min(2);
export const emailValidation = z.string().email();
export const genderValidationOld = z.enum(allGenderIdentifiers, {
  errorMap: (_issue, { data }) => ({
    message: (data == null || data.length === 0) ? "Ein Geschlecht ist erforderlich" : "Ungültiges Geschlecht"
  })
});

export const genderValidation = z.string().nullable().transform((value, context) =>
{
  if(value == null || value.length === 0)
  {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Ein Geschlecht ist erforderlich",
    });
    return z.NEVER;
  }

  if(!allGenderIdentifiers.includes(value))
  {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Ungültiges Geschlecht",
    });
    return z.NEVER;
  }

  return value as GenderIdentifier;
});

export const semesterValidation = z.string().pipe(z.coerce.number().int().max(maximumAmountOfSemesters));
export const universityValidation = z.enum(allUniversities);
export const passwordSchema = z.string().refine(password => passwordRequirements.every(r => r.re.test(password)), {
  message: "Passwort erfüllt nicht die Anforderungen",
});
