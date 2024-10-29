import { idValidation } from "~/common/common.validation";

import { z } from "zod";

export const deleteUserSchema = z
  .object({
    userIdOrEmail: z.string()
      .min(5)
      .transform((val, ctx) =>
      {
        const uuidResult = idValidation.safeParse(val);

        if(uuidResult.success)
        {
          return {
            userEmail: null,
            userId: uuidResult.data
          };
        }

        const emailResult = z.string().email().safeParse(val);

        if(emailResult.success)
        {
          return {
            userEmail: emailResult.data,
            userId: null
          };
        }

        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Bitte gültige E-Mail-Adresse oder User-ID eingeben."
        });

        return z.NEVER;
      })
  })
  .transform((val) => ({ ...val.userIdOrEmail }))
;

export type DeleteUserSchema = z.input<typeof deleteUserSchema>;
