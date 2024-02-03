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

export const legalAreaValidation = z.string().min(1);
export const legalFieldValidation = z.string().min(1).nullable();
export const legalTopicValidation = z.string().min(1).nullable();
export const titleValidation = z.string().min(10);

