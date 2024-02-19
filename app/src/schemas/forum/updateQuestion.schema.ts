import { idValidation } from "@/schemas/common.validation";
import {
  legalFieldsIdsValidation,
  questionTextValidation, subfieldsIdsValidation, titleValidation, topicsIdsValidation
} from "@/schemas/forum/question.valiation";

import { z } from "zod";

export const questionUpdateSchema = z.object({
  legalFieldsIds: legalFieldsIdsValidation,
  subfieldsIds: subfieldsIdsValidation,
  text: questionTextValidation.optional(),
  title: titleValidation.optional(),
  topicsIds: topicsIdsValidation,
});

export type QuestionUpdateSchema = z.input<typeof questionUpdateSchema>;

export const updateQuestionSchema = z.object({
  id: idValidation,
  updatedValues: questionUpdateSchema,
});

export type UpdateQuestionSchema = z.input<typeof updateQuestionSchema>;
