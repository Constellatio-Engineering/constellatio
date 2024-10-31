import { z } from "zod";

import {
  legalFieldIdValidation, questionTextValidation, subfieldsIdsValidation, titleValidation, topicsIdsValidation 
} from "../../common/forum/question.validation";

export const postQuestionSchema = z.object({
  legalFieldId: legalFieldIdValidation,
  subfieldsIds: subfieldsIdsValidation,
  text: questionTextValidation,
  title: titleValidation,
  topicsIds: topicsIdsValidation,
});

export type PostQuestionSchema = z.input<typeof postQuestionSchema>;
