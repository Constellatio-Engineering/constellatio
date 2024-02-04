import { getIdValidationWithMessage, idValidation } from "@/schemas/common.validation";
import { removeHtmlTagsFromString } from "@/utils/utils";

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

  return textTrimmed;
});

export const legalFieldIdValidation = getIdValidationWithMessage("Bitte wähle ein Rechtsgebiet aus");
export const subfieldIdValidation = idValidation.nullable();
export const topicIdValidation = idValidation.nullable();
export const titleValidation = z.string().min(10);
