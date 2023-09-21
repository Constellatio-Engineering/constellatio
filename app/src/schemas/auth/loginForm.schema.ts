import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Ungültige E-Mail Adresse" }),
  password: z
    .string()
    .min(6, { message: "Passwörter haben mindestens 6 Zeichen" }),
});
