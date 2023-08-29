import { registrationFormSchema } from "@/schemas/RegistrationFormSchema";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import { TRPCError } from "@trpc/server";

export const authenticationRouter = createTRPCRouter({
  register: publicProcedure
    .input(registrationFormSchema)
    .mutation(async ({ ctx: { supabaseServerClient }, input }) =>
    {
      console.log("--- register ---");
      console.log(input);

      const { data: signUpData, error: signUpError } = await supabaseServerClient.auth.signUp({
        email: input.email,
        password: input.password,
      });

      if(signUpError)
      {
        console.log("Error while signing up", signUpError);
        throw new TRPCError({ cause: signUpError, code: "BAD_REQUEST" });
      }

      if(!signUpData.session)
      {
        throw new TRPCError({
          cause: {
            message: "Session was null after signUp. This should probably not happen and should be investigated.",
            signUpData,
            signUpError
          },
          code: "BAD_REQUEST"
        });
      }

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
