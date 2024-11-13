/* eslint-disable max-lines */
import { allGenderIdentifiers, type GenderIdentifier } from "@constellatio/shared/validation";
import { z } from "zod";

export const passwordRequirements = [
  { label: "Mindestens 8 Zeichen", re: /.{8,}/ },
  { label: "Mindestens 1 Ziffer", re: /[0-9]/ },
  { label: "Mindestens 1 Großbuchstaben", re: /[A-Z]/ },
  { label: "Mindestens 1 Kleinbuchstaben", re: /[a-z]/ },
  { label: "Mindestens 1 Sonderzeichen: ? ! $ & @ #", re: /[!#$&()*+,-.=/?@{}[\]^_~]/ },
];

export const allUniversities = [
  {
    clickupId: "31f321a8-a320-47df-a7b2-eeac6a38cf79",
    name: "Albert-Ludwigs-Universität Freiburg",
  },
  {
    clickupId: "3fed93bf-df3d-4b46-a08e-3ffa6fe28fb2",
    name: "Bucerius Law School",
  },
  {
    clickupId: "b33e6e90-6b26-4415-9df8-760953050978",
    name: "Christian-Albrechts-Universität zu Kiel",
  },
  {
    clickupId: "265d73a7-7577-4c20-b097-854e0ce82870",
    name: "EBS Universität für Wirtschaft und Recht",
  },
  {
    clickupId: "e8a9f39f-a21e-4f99-9262-82c50b850310",
    name: "Eberhard Karls Universität Tübingen",
  },
  {
    clickupId: "6a66dcf5-c262-410a-9986-ec697c88b41a",
    name: "Europa-Universität Viadrina Frankfurt (Oder)",
  },
  {
    clickupId: "0f5da4d2-204d-45ea-92d5-9287f67650ee",
    name: "Fernuniversität in Hagen",
  },
  {
    clickupId: "eee8a5f1-9145-4f6b-94db-6f6d0779e5ba",
    name: "Freie Universität Berlin",
  },
  {
    clickupId: "4c7152b9-1191-4d1b-853a-14877eee6fb4",
    name: "Friedrich-Alexander-Universität Erlangen-Nürnberg",
  },
  {
    clickupId: "83db13f9-9587-4f05-9398-c124dcaacdb4",
    name: "Friedrich-Schiller-Universität Jena",
  },
  {
    clickupId: "cedae04f-8138-4ae6-80b5-b2c5a4074088",
    name: "Georg-August-Universität Göttingen",
  },
  {
    clickupId: "95235300-a3ba-4d1a-967d-fccbadfb9fd8",
    name: "Gottfried Wilhelm Leibniz Universität Hannover",
  },
  {
    clickupId: "c95af8b6-4cfb-4ee6-aea3-da9e66855085",
    name: "Heinrich-Heine-Universität Düsseldorf",
  },
  {
    clickupId: "1ea9d3ba-5ff0-4376-9e14-e9a3b87c4da0",
    name: "Humboldt-Universität zu Berlin",
  },
  {
    clickupId: "ec92e347-5cb9-4029-a932-1e1bf51e9ca5",
    name: "Johann-Wolfgang-Goethe-Universität Frankfurt am Main",
  },
  {
    clickupId: "12b71cfb-69f7-4bf3-80f3-4ba5b7f59336",
    name: "Johannes Gutenberg-Universität Mainz",
  },
  {
    clickupId: "fc1256b8-44cd-4214-a8ff-6d05cff0c3d7",
    name: "Julius-Maximilians-Universität Würzburg",
  },
  {
    clickupId: "da9006e9-2f48-4073-ab23-f5cebdae00e5",
    name: "Justus-Liebig-Universität Gießen",
  },
  {
    clickupId: "b030c5a2-af8b-425f-b3d9-56d124f39355",
    name: "Ludwig-Maximilians-Universität München",
  },
  {
    clickupId: "e5f8f110-a36b-4ebd-91e6-5ed75655e1d0",
    name: "Martin-Luther-Universität Halle-Wittenberg",
  },
  {
    clickupId: "c022cfcd-8867-4a0d-b7a3-9e1bf6562863",
    name: "Philipps-Universität Marburg",
  },
  {
    clickupId: "47a8d212-2452-42a7-92ed-5479e7699254",
    name: "Rheinische Friedrich-Wilhelms-Universität Bonn",
  },
  {
    clickupId: "7ab2fe91-695b-4993-9027-b9a678ed5c97",
    name: "Ruhr-Universität Bochum",
  },
  {
    clickupId: "ac7d6f05-bd43-4f03-ac26-771ea0c44262",
    name: "Ruprecht-Karls-Universität Heidelberg",
  },
  {
    clickupId: "e75bb96f-2ca3-4518-bb79-2e9dc6d2d05a",
    name: "Universität Augsburg",
  },
  {
    clickupId: "526fa2ac-ecb9-4850-9936-8e6116c9ab66",
    name: "Universität Bayreuth",
  },
  {
    clickupId: "0e67e1b9-b7ce-4ee0-b0fc-cd45b28a98aa",
    name: "Universität Bielefeld",
  },
  {
    clickupId: "90ae5cd1-0fba-4e18-aceb-1c3f62cb64a2",
    name: "Universität Bremen",
  },
  {
    clickupId: "57dafedf-0c40-4861-85ac-bc7961a4f698",
    name: "Universität Greifswald",
  },
  {
    clickupId: "93fc2532-ddc9-4eb9-8d4c-94eddfb981d6",
    name: "Universität Hamburg",
  },
  {
    clickupId: "3c91eaf2-6bea-4340-b863-c00f6831f98e",
    name: "Universität Konstanz",
  },
  {
    clickupId: "9cabec6c-6c6a-49d8-80f7-6cf0805b27e3",
    name: "Universität Leipzig",
  },
  {
    clickupId: "3a6c1445-5359-4846-9a81-3b2ce441dfe4",
    name: "Universität Mannheim",
  },
  {
    clickupId: "fa8529e7-518b-4941-9512-4991da0be522",
    name: "Universität Osnabrück",
  },
  {
    clickupId: "7768ad45-58b5-4cbf-b7cc-eefa985a7634",
    name: "Universität Passau",
  },
  {
    clickupId: "492e7463-cc87-4506-ae94-2a27436489e2",
    name: "Universität Potsdam",
  },
  {
    clickupId: "f3cccd72-8240-41d8-b2c4-144e3440a320",
    name: "Universität Regensburg",
  },
  {
    clickupId: "1050a9bc-d25b-4b66-8e08-3daaa16116c5",
    name: "Universität Trier",
  },
  {
    clickupId: "7a563ec4-0b92-44d4-bfb7-611eb7292741",
    name: "Universität des Saarlandes",
  },
  {
    clickupId: "a997a16b-af5c-4b96-bbc9-066a8fa54903",
    name: "Universität zu Köln",
  },
  {
    clickupId: "2df518bc-4dc5-426f-8fc6-36eb115927a4",
    name: "Westfälische Wilhelms-Universität Münster",
  }
] as const;

export const allUniversityNames = allUniversities.map(u => u.name) as [University, ...[University]];
export type University = typeof allUniversities[number]["name"];

export const maximumAmountOfSemesters = 15 as const;
export const nameValidation = z.string().trim().min(2);
export const optionalNameValidation = z.string()
  .trim()
  .transform(val => val === "" ? null : val)
  .pipe(
    z.union([
      z.null(),
      z.string().min(2)
    ])
  );
export const displayNameValidation = z.string().trim().min(2);
export const emailValidation = z.string().email();
export const genderValidationOld = z.enum(allGenderIdentifiers, {
  errorMap: (_issue, { data }) => ({
    message: (data == null || data.length === 0) ? "Ein Geschlecht ist erforderlich" : "Ungültiges Geschlecht"
  })
});
export const refCodeValidation = z.string().length(8);

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

  if(!allGenderIdentifiers.includes(value as GenderIdentifier))
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
export const universityValidation = z.enum(allUniversityNames);
export const minimumPasswordLength = 8 as const;
export const passwordSchema = z.string().min(minimumPasswordLength);
