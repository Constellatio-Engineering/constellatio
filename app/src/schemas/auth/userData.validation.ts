import { allGenderIdentifiers, type GenderIdentifier } from "@/db/schema";

import { z } from "zod";

export const passwordRequirements = [
  { label: "Mindestens 8 Zeichen", re: /.{8,}/ },
  { label: "Mindestens 1 Ziffer", re: /[0-9]/ },
  { label: "Mindestens 1 Großbuchstaben", re: /[A-Z]/ },
  { label: "Mindestens 1 Kleinbuchstaben", re: /[a-z]/ },
  { label: "Mindestens 1 Sonderzeichen: ? ! $ & @ #", re: /[!#$&()*+,-.=/?@{}[\]^_~]/ },
];

export const allUniversities2 = [
  {
    clickupId: "123456",
    name: "Albert-Ludwigs-Universität Freiburg",
  },
  {
    clickupId: "1234567",
    name: "Bucerius Law School",
  },
  {
    clickupId: "12345678",
    name: "Christian-Albrechts-Universität zu Kiel",
  },
  {
    clickupId: "123456789",
    name: "EBS Universität für Wirtschaft und Recht",
  },
  {
    clickupId: "1234567890",
    name: "Eberhard Karls Universität Tübingen",
  },
  {
    clickupId: "12345678901",
    name: "Europa-Universität Viadrina Frankfurt (Oder)",
  },
  {
    clickupId: "123456789012",
    name: "Fernuniversität in Hagen",
  },
  {
    clickupId: "1234567890123",
    name: "Freie Universität Berlin",
  },
  {
    clickupId: "12345678901234",
    name: "Friedrich-Alexander-Universität Erlangen-Nürnberg",
  },
  {
    clickupId: "123456789012345",
    name: "Friedrich-Schiller-Universität Jena",
  },
  {
    clickupId: "1234567890123456",
    name: "Georg-August-Universität Göttingen",
  },
  {
    clickupId: "12345678901234567",
    name: "Gottfried Wilhelm Leibniz Universität Hannover",
  },
  {
    clickupId: "123456789012345678",
    name: "Heinrich-Heine-Universität Düsseldorf",
  },
  {
    clickupId: "1234567890123456789",
    name: "Humboldt-Universität zu Berlin",
  },
  {
    clickupId: "12345678901234567890",
    name: "Johann-Wolfgang-Goethe-Universität Frankfurt am Main",
  },
  {
    clickupId: "123456789012345678901",
    name: "Johannes Gutenberg-Universität Mainz",
  },
  {
    clickupId: "1234567890123456789012",
    name: "Julius-Maximilians-Universität Würzburg",
  },
  {
    clickupId: "12345678901234567890123",
    name: "Justus-Liebig-Universität Gießen",
  },
  {
    clickupId: "123456789012345678901234",
    name: "Ludwig-Maximilians-Universität München",
  },
  {
    clickupId: "1234567890123456789012345",
    name: "Martin-Luther-Universität Halle-Wittenberg",
  },
  {
    clickupId: "12345678901234567890123456",
    name: "Philipps-Universität Marburg",
  },
  {
    clickupId: "123456789012345678901234567",
    name: "Rheinische Friedrich-Wilhelms-Universität Bonn",
  },
  {
    clickupId: "1234567890123456789012345678",
    name: "Ruhr-Universität Bochum",
  },
  {
    clickupId: "12345678901234567890123456789",
    name: "Ruprecht-Karls-Universität Heidelberg",
  },
  {
    clickupId: "123456789012345678901234567890",
    name: "Universität Augsburg",
  },
  {
    clickupId: "1234567890123456789012345678901",
    name: "Universität Bayreuth",
  },
  {
    clickupId: "12345678901234567890123456789012",
    name: "Universität Bielefeld",
  },
  {
    clickupId: "123456789012345678901234567890123",
    name: "Universität Bremen",
  },
  {
    clickupId: "1234567890123456789012345678901234",
    name: "Universität Greifswald",
  },
  {
    clickupId: "12345678901234567890123456789012345",
    name: "Universität Hamburg",
  },
  {
    clickupId: "123456789012345678901234567890123456",
    name: "Universität Konstanz",
  },
  {
    clickupId: "1234567890123456789012345678901234567",
    name: "Universität Leipzig",
  },
  {
    clickupId: "12345678901234567890123456789012345678",
    name: "Universität Mannheim",
  },
  {
    clickupId: "123456789012345678901234567890123456789",
    name: "Universität Osnabrück",
  },
  {
    clickupId: "1234567890123456789012345678901234567890",
    name: "Universität Passau",
  },
  {
    clickupId: "12345678901234567890123456789012345678901",
    name: "Universität Potsdam",
  },
  {
    clickupId: "123456789012345678901234567890123456789012",
    name: "Universität Regensburg",
  },
  {
    clickupId: "1234567890123456789012345678901234567890123",
    name: "Universität Trier",
  },
  {
    clickupId: "12345678901234567890123456789012345678901234",
    name: "Universität des Saarlandes",
  },
  {
    clickupId: "123456789012345678901234567890123456789012345",
    name: "Universität zu Köln",
  },
  {
    clickupId: "1234567890123456789012345678901234567890123456",
    name: "Westfälische Wilhelms-Universität Münster",
  }
] as const;

export type University2 = typeof allUniversities2[number]["name"];

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
export const nameValidation = z.string().trim().min(2);
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

/* export const passwordSchema = z.string().refine(password => passwordRequirements.every(r => r.re.test(password)), {
  message: "Passwort erfüllt nicht die Anforderungen",
});*/

export const semesterValidation = z.string().pipe(z.coerce.number().int().max(maximumAmountOfSemesters));
export const universityValidation = z.enum(allUniversities);
export const minimumPasswordLength = 8 as const;
export const passwordSchema = z.string().min(minimumPasswordLength);
