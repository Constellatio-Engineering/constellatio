import {
  legalAreaValidation, legalFieldValidation, legalTopicValidation, questionTextValidation, titleValidation 
} from "@/schemas/forum/question.valiation";

import { z } from "zod";

export const postQuestionSchema = z.object({
  legalArea: legalAreaValidation,
  legalField: legalFieldValidation,
  legalTopic: legalTopicValidation,
  text: questionTextValidation,
  title: titleValidation,
});

export type PostQuestionSchema = z.input<typeof postQuestionSchema>;
