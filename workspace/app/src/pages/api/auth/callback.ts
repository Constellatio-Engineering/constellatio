/* eslint-disable max-lines */
import { queryParams } from "@/utils/query-params";

import { finishSignup, type FinishSignUpProps } from "@constellatio/api/utils/signup";
import { eq, or, type SQL } from "@constellatio/db";
import { db } from "@constellatio/db/client";
import { users } from "@constellatio/db/schema";
import { env } from "@constellatio/env";
import { idValidation } from "@constellatio/schemas/common/common.validation";
import { appPaths, authPaths } from "@constellatio/shared/paths";
import { authProviders } from "@constellatio/shared/validation";
import { splitFullName } from "@constellatio/utils/user";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { type NextApiHandler, type NextApiResponse } from "next";
import { z } from "zod";

const redirectToErrorPage = (res: NextApiResponse, error: unknown) =>
{
  let errorMessage: string;

  if(error instanceof Error)
  {
    errorMessage = error.message;
  }
  else if(error && typeof error === "object")
  {
    errorMessage = String(error);
  }
  else if(typeof error === "string")
  {
    errorMessage = error;
  }
  else
  {
    errorMessage = "An unknown error occurred";
  }

  res.redirect(`${authPaths.login}?${queryParams.socialAuthError}=${encodeURIComponent(errorMessage)}`);
};

const callbackProviderSchema = z.object({
  app_metadata: z.object({
    provider: z.enum(authProviders),
  }),
});

const appleCallbackSchema = z.object({
  email: z.string().email(),
  id: idValidation,
  provider: z.literal("apple"),
  user_metadata: z.object({
    full_name: z.string(),
    name: z.string(),
  }).partial()
});

const googleCallbackSchema = z.object({
  email: z.string().email(),
  id: idValidation,
  provider: z.literal("google"),
  user_metadata: z.object({
    avatar_url: z.string(),
    full_name: z.string(),
    name: z.string(),
    picture: z.string(),
  }).partial()
});

const linkedinCallbackSchema = z.object({
  email: z.string().email(),
  id: idValidation,
  provider: z.literal("linkedin_oidc"),
  user_metadata: z.object({
    family_name: z.string(),
    given_name: z.string(),
    picture: z.string().optional(),
  })
});

const callbackSchema = z.discriminatedUnion("provider", [
  appleCallbackSchema,
  googleCallbackSchema,
  linkedinCallbackSchema
]);

export type AuthCallbackSchema = z.infer<typeof callbackSchema>;

const handler: NextApiHandler = async (req, res) =>
{
  console.log("----- Auth callback received -----");

  const { code } = req.query;

  if(!code)
  {
    console.warn("No code was provided. Redirecting to index route.");
    return redirectToErrorPage(res, "No code was provided");
  }

  if(typeof code !== "string")
  {
    console.error("Code is not a string. Got: ", code, "Redirecting to index route.");
    return redirectToErrorPage(res, "Code is not a string");
  }

  const supabase = createPagesServerClient({ req, res }, {
    supabaseKey: env.SUPABASE_SERVICE_ROLE_KEY,
    supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL
  });

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  console.log("exchangeCodeForSession");
  console.log(data);

  try
  {
    if(error)
    {
      console.error("Error while exchanging code for session: ", error);
      throw error;
    }

    const existingUserQuery: SQL[] = [eq(users.id, data.user.id)];

    if(data.user.email)
    {
      existingUserQuery.push(eq(users.email, data.user.email));
    }

    const existingUser = await db.query.users.findFirst({
      where: or(...existingUserQuery)
    });

    if(existingUser)
    {
      console.log("User already exists");
      console.log(existingUser);
      return res.redirect(appPaths.dashboard);
    }
    
    const providerData = callbackProviderSchema.parse(data.user);

    console.log("providerData");
    console.log(providerData);

    const parsedCallbackData = callbackSchema.parse({
      ...data.user,
      provider: providerData.app_metadata.provider
    });

    console.log("parsedCallbackData");
    console.log(parsedCallbackData);

    let additionalUserData: Pick<FinishSignUpProps["user"], "displayName" | "firstName" | "lastName" | "socialAuthProfilePictureUrl">;

    switch (parsedCallbackData.provider)
    {
      case "apple":
      {
        const { firstName, lastName } = splitFullName(parsedCallbackData.user_metadata.full_name);

        additionalUserData = {
          displayName: parsedCallbackData.user_metadata.name || parsedCallbackData.email.split("@")[0] || null,
          firstName,
          lastName,
          socialAuthProfilePictureUrl: null,
        };
        break;
      }
      case "google":
      {
        const { firstName, lastName } = splitFullName(parsedCallbackData.user_metadata.full_name);

        additionalUserData = {
          displayName: parsedCallbackData.user_metadata.name || parsedCallbackData.email.split("@")[0] || null,
          firstName,
          lastName,
          socialAuthProfilePictureUrl: parsedCallbackData.user_metadata.avatar_url || parsedCallbackData.user_metadata.picture
        };
        break;
      }
      case "linkedin_oidc":
      {
        additionalUserData = {
          displayName: `${parsedCallbackData.user_metadata.given_name} ${parsedCallbackData.user_metadata.family_name}`,
          firstName: parsedCallbackData.user_metadata.given_name,
          lastName: parsedCallbackData.user_metadata.family_name,
          socialAuthProfilePictureUrl: parsedCallbackData.user_metadata.picture
        };
        break;
      }
    }

    console.log("finishSignup");
    console.log({
      supabaseServerClient: supabase,
      user: {
        ...additionalUserData,
        authProvider: parsedCallbackData.provider,
        email: parsedCallbackData.email,
      },
    });

    await finishSignup({
      supabaseServerClient: supabase,
      user: {
        ...additionalUserData,
        authProvider: parsedCallbackData.provider,
        email: parsedCallbackData.email,
        id: parsedCallbackData.id,
      },
    });
  }
  catch (e: unknown)
  {
    console.error("Error while finishing signup", e);
    await supabase.auth.signOut();
    return redirectToErrorPage(res, e);
  }

  return res.redirect(appPaths.dashboard);
};

export default handler;
