import { z } from "zod";

import { idValidation } from "../../common/common.validation";

export const getCaseProgressSchema = z
  .object({
    caseId: idValidation,
  });

export type GetCaseProgressSchema = z.input<typeof getCaseProgressSchema>;
