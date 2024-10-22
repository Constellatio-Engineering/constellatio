import { db } from "@/db/connection";
import { users } from "@/db/schema";
import { env } from "@/env.mjs";
import { appPaths, authPaths } from "@/utils/paths";
import { queryParams } from "@/utils/query-params";
import { finishSignup } from "@/utils/signup";

import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { eq } from "drizzle-orm";
import { type NextApiHandler, type NextApiResponse } from "next";

const errorRedirectUrl = `${authPaths.login}?${queryParams.socialAuthError}=true`;

const redirectToErrorPage = (res: NextApiResponse) =>
{
  res.redirect(errorRedirectUrl);
};

const handler: NextApiHandler = async (req, res) =>
{
  console.log("----- Auth callback received -----");

  console.log("req.query", req.query);
  const { code } = req.query;

  if(!code)
  {
    console.warn("No code was provided. Redirecting to index route.");
    return redirectToErrorPage(res);
  }

  if(typeof code !== "string")
  {
    console.error("Code is not a string. Got: ", code, "Redirecting to index route.");
    return redirectToErrorPage(res);
  }

  const supabase = createPagesServerClient({ req, res }, {
    supabaseKey: env.SUPABASE_SERVICE_ROLE_KEY,
    supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL
  });
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if(error)
  {
    // TODO: Test this and implement frontend error handling
    console.error("Error while exchanging code for session: ", error);
    return redirectToErrorPage(res);
  }

  console.log("auth callback user data", data.user);

  const existingUser = await db.query.users.findFirst({
    where: eq(users.id, data.user.id)
  });

  if(existingUser)
  {
    console.log("User already exists. Redirecting to index route.");
    return res.redirect(appPaths.dashboard);
  }

  try
  {
    await finishSignup({
      authProvider: data.user.app_metadata.provider,
      supabaseServerClient: supabase,
      user: data.user
    });
  }
  catch (e: unknown)
  {
    console.error("Error while finishing signup", e);
    await supabase.auth.signOut();
    return redirectToErrorPage(res);
  }

  return res.redirect(appPaths.dashboard);
};

export default handler;
