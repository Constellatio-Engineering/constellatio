import { appRouter } from "@/server/api/root";
import { getTrpcContext } from "@/server/api/trpc";
 
import { createServerSideHelpers } from "@trpc/react-query/server";
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import superjson from "superjson";

export const getTrpcServerSideHelpers = async (context: GetServerSidePropsContext | {
  req: NextApiRequest;
  res: NextApiResponse;
}) =>
{
  const trpcContext = await getTrpcContext(context);

  const helpers = createServerSideHelpers({
    ctx: trpcContext,
    router: appRouter,
    transformer: superjson,
  });

  return helpers;
};
