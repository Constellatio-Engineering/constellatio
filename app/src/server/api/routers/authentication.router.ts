import { db } from "@/db/connection";
import { type UserInsert, users } from "@/db/schema";
import { registrationFormSchema } from "@/schemas/auth/registrationForm.schema";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getConfirmEmailUrl } from "@/utils/paths";
import { EmailAlreadyTakenError, InternalServerError, RegisterError } from "@/utils/serverError";

import { eq } from "drizzle-orm";

export const authenticationRouter = createTRPCRouter({
  register: publicProcedure
    .input(registrationFormSchema)
    .mutation(async ({ ctx: { supabaseServerClient }, input }) =>
    {
      console.log("--- Registering user ---");

      const start = performance.now();

      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, input.email)
      });

      if(existingUser)
      {
        console.log("User with email already exists", existingUser);
        throw new EmailAlreadyTakenError();
      }

      const { data: signUpData, error: signUpError } = await supabaseServerClient.auth.signUp({
        email: input.email,
        options: { emailRedirectTo: getConfirmEmailUrl() },
        password: input.password
      });

      console.log(`supabase sign up took ${performance.now() - start}ms`);

      if(signUpError)
      {
        console.log("error occurred while signing up", signUpError);
        throw new RegisterError(signUpError);
      }

      const userId = signUpData.user?.id;

      if(!userId)
      {
        throw new InternalServerError(new Error("User ID was null after signUp. This should probably not happen and should be investigated."));
      }

      try
      {
        const userToInsert: UserInsert = {
          displayName: input.displayName,
          email: input.email,
          firstName: input.firstName,
          gender: input.gender,
          id: userId,
          lastName: input.lastName,
          semester: input.semester,
          university: input.university
        };

        await db.insert(users).values(userToInsert);
      }
      catch (e: unknown)
      {
        console.log("Deleting user because insertion into public schema failed");

        const deleteUserResult = await supabaseServerClient.auth.admin.deleteUser(userId);

        if(deleteUserResult.error)
        {
          console.log("Error while deleting user", deleteUserResult.error);
        }

        throw new InternalServerError(new Error("Error while inserting user: " + e));
      }

      console.log(`Complete sign up took ${performance.now() - start}ms`);

      if(!signUpData.session)
      {
        // Sign up was successful, but email confirmation is enabled. The user needs to confirm their email address.
        return ({ resultType: "emailConfirmationRequired" }) as const;
      }

      // If the session is available right after sign up, it means that email confirmation is disabled.
      return ({
        resultType: "signupComplete",
        session: signUpData.session
      }) as const;
    }),
});
