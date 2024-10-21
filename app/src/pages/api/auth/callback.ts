import { db } from "@/db/connection";
import { users } from "@/db/schema";
import { appPaths, authPaths } from "@/utils/paths";
import { queryParams } from "@/utils/query-params";

import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { eq } from "drizzle-orm";
import { type NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) =>
{
  console.log("----- Auth callback received -----", req.query, req.body);
  const { code, next } = req.query;

  console.log("code", code);
  console.log("next", next);

  if(!code)
  {
    console.warn("No code was provided. Redirecting to index route.");
    return res.redirect("/");
  }

  if(typeof code !== "string")
  {
    console.error("Code is not a string. Got: ", code, "Redirecting to index route.");
    return res.redirect("/");
  }

  const supabase = createPagesServerClient({ req, res });
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if(error)
  {
    // TODO: Test this and implement frontend error handling
    console.error("Error while exchanging code for session: ", error);
    return res.redirect(authPaths.login + "?" + queryParams.socialAuthError + "=" + error.message);
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.id, data.user.id)
  });

  if(existingUser)
  {
    console.log("User already exists. Redirecting to index route.");
    return res.redirect(appPaths.dashboard);
  }

  console.log("user data", data.user);
  console.log("session", data.session);

  return res.redirect(authPaths.login + "?success=true");
};

export default handler;
