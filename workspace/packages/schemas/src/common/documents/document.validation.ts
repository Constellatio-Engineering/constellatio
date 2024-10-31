import { z } from "zod";

import { idValidation } from "../common.validation";

export const contentValidation = z.string();
export const folderIdValidation = idValidation.nullable();
export const nameValidation = z.string().min(1).max(100);
