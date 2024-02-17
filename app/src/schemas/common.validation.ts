/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { z } from "zod";

export const idValidation = z.string().uuid();
export const getIdValidationWithMessage = (message: string) => z.string().uuid({ message });
