import { idValidation } from "@/schemas/common.validation";
import {
  legalFieldValidation, legalAreaValidation, legalTopicValidation, questionTextValidation, titleValidation 
} from "@/schemas/forum/question.valiation";

import { z } from "zod";

export const questionUpdateSchema = z.object({
  legalArea: legalAreaValidation,
  legalField: legalFieldValidation,
  legalTopic: legalTopicValidation,
  text: questionTextValidation,
  title: titleValidation,
}).partial();

export type QuestionUpdateSchema = z.input<typeof questionUpdateSchema>;

export const updateQuestionSchema = z.object({
  id: idValidation,
  updatedValues: questionUpdateSchema,
});

export type UpdateQuestionSchema = z.input<typeof updateQuestionSchema>;
