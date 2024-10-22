import { db } from "@/db/connection";
import { users } from "@/db/schema";
import { registrationFormSchema } from "@/schemas/auth/registrationForm.schema";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getConfirmEmailUrl } from "@/utils/paths";
import { EmailAlreadyTakenError, InternalServerError, RegisterError } from "@/utils/serverError";
import { finishSignup } from "@/utils/signup";

import { eq } from "drizzle-orm";

export const authenticationRouter = createTRPCRouter({
  register: publicProcedure
    .input(registrationFormSchema)
    .mutation(async ({ ctx: { supabaseServerClient }, input }) =>
    {
      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, input.email)
      });

      if(existingUser)
      {
        throw new EmailAlreadyTakenError();
      }

      const { data: signUpData, error: signUpError } = await supabaseServerClient.auth.signUp({
        email: input.email,
        options: { emailRedirectTo: getConfirmEmailUrl() },
        password: input.password
      });

      if(signUpError)
      {
        console.log("error occurred while signing up", signUpError);
        throw new RegisterError(signUpError);
      }

      const userData = signUpData.user;

      if(!userData)
      {
        throw new InternalServerError(new Error("User data was null after signUp. This should probably not happen and should be investigated."));
      }

      await finishSignup({
        authProvider: "email",
        referralCode: input.refCode, 
        supabaseServerClient,
        user: userData
      });

      if(!signUpData.session)
      {
        // Sign up was successful, but email confirmation is enabled. The user needs to confirm their email address.
        return { resultType: "emailConfirmationRequired" } as const;
      }

      // If the session is available right after sign up, it means that email confirmation is disabled.
      return {
        resultType: "signupComplete",
        session: signUpData.session
      } as const;
    }),
});
