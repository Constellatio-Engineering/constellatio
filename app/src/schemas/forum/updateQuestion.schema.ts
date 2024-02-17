import { idValidation } from "@/schemas/common.validation";
import {
  questionTextValidation, titleValidation, legalFieldIdValidation, subfieldIdValidation, topicIdValidation
} from "@/schemas/forum/question.valiation";

import { z } from "zod";

export const questionUpdateSchema = z.object({
  legalFieldId: legalFieldIdValidation,
  subfieldId: subfieldIdValidation,
  text: questionTextValidation,
  title: titleValidation,
  topicId: topicIdValidation,
}).partial();

export type QuestionUpdateSchema = z.input<typeof questionUpdateSchema>;

export const updateQuestionSchema = z.object({
  id: idValidation,
  updatedValues: questionUpdateSchema,
});

export type UpdateQuestionSchema = z.input<typeof updateQuestionSchema>;
