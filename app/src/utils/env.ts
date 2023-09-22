import { env } from "@/env.mjs";

export const isDevelopmentOrStaging = env.NEXT_PUBLIC_NODE_ENV === "development" || env.NEXT_PUBLIC_NODE_ENV === "staging";
