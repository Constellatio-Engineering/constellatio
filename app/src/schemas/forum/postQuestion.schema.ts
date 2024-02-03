import { allGenderIdentifiers, type GenderIdentifier } from "@/db/schema";
import { removeHtmlTagsFromString } from "@/utils/utils";

import { z } from "zod";

export const richtextValidation = z.string().nullable().transform((value, context) =>
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

export const postQuestionSchema = z.object({
  legalArea: z.string().min(1),
  legalField: z.string().min(1).nullable(),
  legalTopic: z.string().min(1).nullable(),
  question: richtextValidation,
  title: z.string().min(10),
});

export type PostQuestionSchema = z.input<typeof postQuestionSchema>;
