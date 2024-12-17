import { z } from "zod";

import { idValidation } from "../common.validation";

export const answerValidation = z.string().min(1);
export const setIdValidation = idValidation.nullable();
export const questionValidation = z.string().min(1);
