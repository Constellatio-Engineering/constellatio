import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const nodeEnvEnum = z.enum(["development", "test", "production"]);

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    SUPABASE_SERVICE_ROLE_KEY: z.string(),
    DATABASE_URL: z.string().url(),
    CAISY_API_KEY: z.string(),
    CAISY_PROJECT_ID: z.string(),
    STRIPE_SECRET_KEY: z.string(),
    THROTTLE_REQUESTS_IN_MS: z.string().pipe(z.coerce.number().int().min(1)).optional(),
    GOOGLE_CLOUD_STORAGE_PROJECT_ID: z.string(),
    GOOGLE_CLOUD_STORAGE_BUCKET_NAME: z.string(),
    GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL: z.string().email(),
    GOOGLE_SERVICE_ACCOUNT_CLIENT_ID: z.string(),
    GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: z.string(),
    MEILISEARCH_MASTER_API_KEY: z.string(),
    MEILISEARCH_HOST_URL: z.string().url(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_WEBSITE_URL: z.string().url(),
    NEXT_PUBLIC_MAXIMUM_FILE_UPLOAD_SIZE_IN_MB: z.string().pipe(z.coerce.number().int().min(1).max(999)),
    NEXT_PUBLIC_NODE_ENV: nodeEnvEnum,
    NEXT_PUBLIC_MEILISEARCH_PUBLIC_URL: z.string().url(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side, so we need to destruct manually.
   */
  runtimeEnv: {
    NEXT_PUBLIC_NODE_ENV: process.env.NODE_ENV,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    CAISY_API_KEY: process.env.CAISY_API_KEY,
    CAISY_PROJECT_ID: process.env.CAISY_PROJECT_ID,
    NEXT_PUBLIC_WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL,
    NEXT_PUBLIC_MAXIMUM_FILE_UPLOAD_SIZE_IN_MB: process.env.NEXT_PUBLIC_MAXIMUM_FILE_UPLOAD_SIZE_IN_MB,
    THROTTLE_REQUESTS_IN_MS: process.env.THROTTLE_REQUESTS_IN_MS,
    GOOGLE_CLOUD_STORAGE_PROJECT_ID: process.env.GOOGLE_CLOUD_STORAGE_PROJECT_ID,
    GOOGLE_CLOUD_STORAGE_BUCKET_NAME: process.env.GOOGLE_CLOUD_STORAGE_BUCKET_NAME,
    GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
    GOOGLE_SERVICE_ACCOUNT_CLIENT_ID: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_ID,
    GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
    NEXT_PUBLIC_MEILISEARCH_PUBLIC_URL: process.env.NEXT_PUBLIC_MEILISEARCH_PUBLIC_URL,
    MEILISEARCH_HOST_URL: process.env.MEILISEARCH_HOST_URL,
    MEILISEARCH_MASTER_API_KEY: process.env.MEILISEARCH_MASTER_API_KEY,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
