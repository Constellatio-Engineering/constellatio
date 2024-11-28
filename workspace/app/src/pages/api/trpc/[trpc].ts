import { appRouter, createTRPCContext } from "@constellatio/api";
import { createNextApiHandler } from "@trpc/server/adapters/next";

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
