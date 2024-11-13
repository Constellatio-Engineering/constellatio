import { z } from "zod";

export const idValidation = z.string().uuid();
export const getIdValidationWithMessage = (message: string) => z.string().uuid({ message });
export const timeZoneOffsetValidation = z.number().min(-12 * 60).max(14 * 60);
