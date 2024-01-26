import { removeHtmlTagsFromString } from "@/utils/utils";

import { z } from "zod";

export const postQuestionSchema = z.object({
  legalArea: z.string().min(1),
  legalField: z.string().min(1).nullable(),
  legalTopic: z.string().min(1).nullable(),
  question: z.string().refine(text => removeHtmlTagsFromString(text, false).trim().length >= 10, {
    message: "Muss mindestens 10 Zeichen enthalten"
  }),
  title: z.string().min(10),
});

export type PostQuestionSchema = z.input<typeof postQuestionSchema>;
