import { idValidation } from "@/schemas/common.validation";

import { z } from "zod";

export const contentValidation = z.string();
export const folderIdValidation = idValidation.nullable();
export const nameValidation = z.string().min(1).max(100);
