import { appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";

import { createNextApiHandler } from "@trpc/server/adapters/next";

export default createNextApiHandler({
  createContext: createTRPCContext,
  onError: ({ error, path }) =>
  {
    console.error(`❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`, error.stack);
  },
  router: appRouter,
});
