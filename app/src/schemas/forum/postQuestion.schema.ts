import {
  questionTextValidation, titleValidation, subfieldIdValidation, topicIdValidation, legalFieldIdValidation
} from "@/schemas/forum/question.valiation";

import { z } from "zod";

export const postQuestionSchema = z.object({
  legalFieldId: legalFieldIdValidation,
  subfieldId: subfieldIdValidation,
  text: questionTextValidation,
  title: titleValidation,
  topicId: topicIdValidation,
});

export type PostQuestionSchema = z.input<typeof postQuestionSchema>;
