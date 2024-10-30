import { createNextApiHandler } from "@trpc/server/adapters/next";

import { appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";

export const config = {
  api: {
    externalResolver: true,
  },
  maxDuration: 15,
};

export default createNextApiHandler({
  createContext: createTRPCContext,
  onError: ({ error, path }) =>
  {
    console.error(`❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`);
  },
  router: appRouter,
});
