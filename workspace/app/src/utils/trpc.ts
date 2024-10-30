import { type GetServerSidePropsContext, type NextApiRequest, type NextApiResponse } from "next";
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
