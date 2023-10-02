import { db } from "@/db/connection";
import { type UserInsert, users } from "@/db/schema";
import { registrationFormSchema } from "@/schemas/auth/registrationForm.schema";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getConfirmEmailUrl } from "@/utils/paths";
import { EmailAlreadyTakenError, InternalServerError, RegisterError } from "@/utils/serverError";

export const authenticationRouter = createTRPCRouter({
  register: publicProcedure
    .input(registrationFormSchema)
    .mutation(async ({ ctx: { supabaseServerClient }, input }) =>
    {
      const start = performance.now();

      console.time("Supabase sign up");

      const { data: signUpData, error: signUpError } = await supabaseServerClient.auth.signUp({
        email: input.email,
        options: { emailRedirectTo: getConfirmEmailUrl() },
        password: input.password
      });

      console.timeEnd("Supabase sign up");

      if(signUpError)
      {
        if(signUpError.message === "User already registered")
        {
          throw new EmailAlreadyTakenError();
        }

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

        console.time("Inserting user into db");

        await db.insert(users).values(userToInsert);

        console.timeEnd("Inserting user into db");
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

      if(!signUpData.session)
      {
        const end = performance.now();
        console.log(`Sign up took ${end - start}ms`);

        // Sign up was successful, but email confirmation is enabled. The user needs to confirm their email address.
        return ({ resultType: "emailConfirmationRequired" }) as const;
      }

      const end = performance.now();
      console.log(`Sign up took ${end - start}ms`);

      // If the session is available right after sign up, it means that email confirmation is disabled.
      return ({
        resultType: "signupComplete",
        session: signUpData.session
      }) as const;
    }),
});
