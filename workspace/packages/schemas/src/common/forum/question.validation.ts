import { idValidation } from "@/common/common.validation";
import { removeHtmlTagsFromString } from "@constellatio/utils";

import { z } from "zod";

export const questionTextValidation = z.string().nullable().transform((value, context) =>
{
  if(value == null)
  {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Darf nicht leer sein",
    });
    return z.NEVER;
  }

  const textTrimmed = removeHtmlTagsFromString(value, false).trim();

  if(textTrimmed.length < 10)
  {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Muss mindestens 10 Zeichen enthalten",
    });
    return z.NEVER;
  }

  return value;
});

/* export const legalFieldsIdsValidation = z
  .array(idValidation)
  .min(1, { message: "Bitte wähle mindestens ein Rechtsgebiet aus" })
  .max(1, { message: "Du kannst nur ein Rechtsgebiet auswählen" });*/

export const legalFieldIdValidation = z.string().nullish().transform((value, context) =>
{
  if(!value)
  {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Bitte wähle ein Rechtsgebiet aus",
    });
    return z.NEVER;
  }

  return value;
});

export const titleMaxLength = 150;
export const titleValidation = z.string().min(10).max(titleMaxLength).transform(title => title.trim());
export const subfieldsIdsValidation = z.array(idValidation);
export const topicsIdsValidation = z.array(idValidation);
