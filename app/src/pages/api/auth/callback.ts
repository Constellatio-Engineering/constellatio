import { db } from "@/db/connection";
import { authProviders, users } from "@/db/schema";
import { env } from "@/env.mjs";
import { idValidation } from "@/schemas/common.validation";
import { appPaths, authPaths } from "@/utils/paths";
import { queryParams } from "@/utils/query-params";
import { finishSignup, type FinishSignUpProps } from "@/utils/signup";
import { splitFullName } from "@/utils/utils";

import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { eq } from "drizzle-orm";
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
  googleCallbackSchema,
  linkedinCallbackSchema
]);

export type AuthCallbackSchema = z.infer<typeof callbackSchema>;

const handler: NextApiHandler = async (req, res) =>
{
  console.log("----- Auth callback received -----");

  console.log("req.query", req.query);
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

  try
  {
    if(error)
    {
      console.error("Error while exchanging code for session: ", error);
      throw error;
    }

    const existingUser = await db.query.users.findFirst({
      where: eq(users.id, data.user.id)
    });

    if(existingUser)
    {
      return res.redirect(appPaths.dashboard);
    }
    
    const providerData = callbackProviderSchema.parse(data.user);
    const parsedCallbackData = callbackSchema.parse({
      ...data.user,
      provider: providerData.app_metadata.provider
    });

    let userNameData: Pick<FinishSignUpProps["user"], "displayName" | "firstName" | "lastName">;

    switch (parsedCallbackData.provider)
    {
      case "google":
      {
        const { firstName, lastName } = splitFullName(parsedCallbackData.user_metadata.full_name);

        userNameData = {
          displayName: parsedCallbackData.user_metadata.name || parsedCallbackData.email.split("@")[0] || null,
          firstName,
          lastName,
        };
        break;
      }
      case "linkedin_oidc":
      {
        userNameData = {
          displayName: `${parsedCallbackData.user_metadata.given_name} ${parsedCallbackData.user_metadata.family_name}`,
          firstName: parsedCallbackData.user_metadata.given_name,
          lastName: parsedCallbackData.user_metadata.family_name,
        };
        break;
      }
    }

    await finishSignup({
      supabaseServerClient: supabase,
      user: {
        ...userNameData,
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
