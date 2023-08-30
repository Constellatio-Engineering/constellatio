import { db } from "@/db/connection";
import { registrationFormSchema } from "@/schemas/RegistrationFormSchema";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { EmailAlreadyTakenError, InternalServerError, RegisterError } from "@/utils/serverError";

export const authenticationRouter = createTRPCRouter({
  register: publicProcedure
    .input(registrationFormSchema)
    .mutation(async ({ ctx: { supabaseServerClient }, input }) =>
    {
      const { data: signUpData, error: signUpError } = await supabaseServerClient.auth.signUp({
        email: input.email,
        password: input.password,
      });

      if(signUpError)
      {
        if(signUpError.message === "User already registered")
        {
          throw new EmailAlreadyTakenError();
        }

        throw new RegisterError(signUpError);
      }

      if(!signUpData.session)
      {
        throw new InternalServerError(new Error("Session was null after signUp. This should probably not happen and should be investigated."));
      }

      console.log(signUpData.user?.id);

      /* const { data: upsertData, error: upsertError } = await supabaseAdmin
        .from("profiles")
        .upsert({
          displayName: body.displayName,
          firstName: body.firstName,
          gender: body.gender,
          id: signUpData.user?.id ?? "",
          lastName: body.lastName,
          semester: body.semester,
          university: body.university,
        })
        .select();

      if(upsertError)
      {
        console.log("error while upserting", upsertError);
      }

      console.log("upsertData", upsertData);*/

      return signUpData.session;
    }),
});
