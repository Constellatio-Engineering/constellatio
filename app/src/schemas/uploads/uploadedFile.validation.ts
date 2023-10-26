import { z } from "zod";

export const idValidation = z.string().uuid();
export const folderIdValidation = z.string().uuid().nullable();
export const nameValidation = z.string().min(1).max(100);
