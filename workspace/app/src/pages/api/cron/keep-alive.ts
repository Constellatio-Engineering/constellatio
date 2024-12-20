/* eslint-disable max-lines */
import { appRouter, createCallerFactory } from "@constellatio/api";
import { env } from "@constellatio/env";
import { appPaths, authPaths } from "@constellatio/shared/paths";
import { printAllSettledPromisesSummary } from "@constellatio/utils/promise";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";
import { type NextApiHandler } from "next";

// do not cache this function
export const revalidate = 0;

const handler: NextApiHandler = async (req, res): Promise<void> =>
{
  if(req.headers.authorization !== `Bearer ${env.CRON_SECRET}`)
  {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const createCaller = createCallerFactory(appRouter);
  const caller = createCaller({
    session: null,
    supabaseServerClient: createPagesServerClient({ req, res }, {
      supabaseKey: env.SUPABASE_SERVICE_ROLE_KEY,
      supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL
    }),
    user: null
  });

  const websiteUrl = env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT === "development" ? "http://localhost:3010" : env.NEXT_PUBLIC_WEBSITE_URL;

  const results = await Promise.allSettled([
    axios.get(websiteUrl), // keep alive getStaticProps
    axios.get(websiteUrl + authPaths.login), // keep alive getStaticProps
    axios.get(websiteUrl + authPaths.register), // keep alive getStaticProps
    axios.get(websiteUrl + appPaths.dashboard), // keep alive middleware
    caller.internalUseOnly_utils.keepAlive() // keep alive trpc routes
  ]);

  printAllSettledPromisesSummary(results, "keep-alive");

  const failedPromises = results.filter((result): result is PromiseRejectedResult => result.status === "rejected");

  if(failedPromises.length > 0)
  {
    return res.status(500).json({ 
      failedPromises: failedPromises.map(result => result.reason),
      message: "Internal server error"
    });
  }

  return res.status(200).json({ message: "Success" });
};

export default handler;
