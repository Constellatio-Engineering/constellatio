import { z } from "zod";

export const updatePasswordFormSchema = z
  .object({
    password: z.string().min(6),
    passwordConfirm: z.string().min(6),
  })
  .refine(
    (schema) => {
      return schema.password === schema.passwordConfirm;
    },
    { message: "Deine Passwörter stimmen nicht überein" },
  );
