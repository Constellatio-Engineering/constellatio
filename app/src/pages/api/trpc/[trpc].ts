import { appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";

import { createNextApiHandler } from "@trpc/server/adapters/next";

export const config = {
  api: {
    externalResolver: true,
  },
  maxDuration: 5,
};

export default createNextApiHandler({
  createContext: createTRPCContext,
  onError: ({ error, path }) =>
  {
    console.error(`❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`);
  },
  router: appRouter,
});
