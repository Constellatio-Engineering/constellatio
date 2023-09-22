import { db } from "@/db/connection";
import { type UserInsert, usersTable } from "@/db/schema";
import { env } from "@/env.mjs";
import { registrationFormSchema } from "@/schemas/auth/registrationForm.schema";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { EmailAlreadyTakenError, InternalServerError, RegisterError } from "@/utils/serverError";

export const authenticationRouter = createTRPCRouter({
  register: publicProcedure
    .input(registrationFormSchema)
    .mutation(async ({ ctx: { supabaseServerClient }, input }) =>
    {
      const { data: signUpData, error: signUpError } = await supabaseServerClient.auth.signUp({
        email: input.email,
        options: {
          emailRedirectTo: env.FRONTEND_URL + "/confirm",
        },
        password: input.password
      });

      if(signUpError)
      {
        if(signUpError.message === "User already registered")
        {
          throw new EmailAlreadyTakenError();
        }

        throw new RegisterError(signUpError);
      }

      const userId = signUpData.user?.id;

      console.log("User signed up successfully", signUpData.user);

      if(!userId)
      {
        throw new InternalServerError(new Error("User ID was null after signUp. This should probably not happen and should be investigated."));
      }

      if(!signUpData.session)
      {
        throw new InternalServerError(new Error("Session was null after signUp. This should probably not happen and should be investigated."));
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

        await db.insert(usersTable).values(userToInsert);
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

      return signUpData.session;
    }),
});
