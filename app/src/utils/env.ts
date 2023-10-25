import { env } from "@/env.mjs";

export const isDevelopmentOrStaging = env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT === "development" || env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT === "staging";
export const isDevelopment = env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT === "development";
