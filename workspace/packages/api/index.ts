// TODO: QUESTION @Kotti: export direct in package.json instead?
import { type AppRouter, appRouter } from "./src/root";
import { createTRPCContext, createCallerFactory, getTrpcContext } from "./src/trpc";

export {
  type AppRouter, appRouter, createTRPCContext, createCallerFactory, getTrpcContext
};
