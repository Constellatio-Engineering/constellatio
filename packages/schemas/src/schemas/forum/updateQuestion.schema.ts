import { idValidation } from "@/common/common.validation";
import {
  legalFieldIdValidation, questionTextValidation, subfieldsIdsValidation, titleValidation, topicsIdsValidation 
} from "@/common/forum/question.validation";

import { z } from "zod";

export const questionUpdateSchema = z.object({
  legalFieldId: legalFieldIdValidation,
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
