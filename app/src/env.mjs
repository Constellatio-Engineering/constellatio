import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const urlValidation = z
	.string()
	.url()
	.refine((url) => !url.endsWith("/"), {
		message: "urls must not end with a trailing slash",
	});

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    SUPABASE_SERVICE_ROLE_KEY: z.string(),
    DATABASE_URL: urlValidation,
    CAISY_API_KEY: z.string(),
    CAISY_PROJECT_ID: z.string(),
    STRIPE_SECRET_KEY: z.string(),
    THROTTLE_REQUESTS_IN_MS: z.string().pipe(z.coerce.number().int().min(1)).optional(),
    GOOGLE_CLOUD_STORAGE_PROJECT_ID: z.string(),
    GOOGLE_CLOUD_STORAGE_BUCKET_NAME: z.string(),
    GOOGLE_SERVICE_ACCOUNT_BASE64: z.string(),
    MEILISEARCH_MASTER_API_KEY: z.string(),
    MEILISEARCH_HOST_URL: urlValidation,
    CAISY_WEBHOOKS_SECRET_KEY: z.string(),
    CAISY_CASE_BLUEPRINT_ID: z.string(),
    CAISY_ARTICLE_BLUEPRINT_ID: z.string(),
    CAISY_MAIN_CATEGORY_BLUEPRINT_ID: z.string(),
    CAISY_LEGAL_AREA_BLUEPRINT_ID: z.string(),
    CAISY_TOPIC_BLUEPRINT_ID: z.string(),
    CAISY_TAG_BLUEPRINT_ID: z.string(),
    CRON_SECRET: z.string(),
    STRIPE_PREMIUM_PLAN_PRICE_ID: z.string(),
    STRIPE_SIGNING_SECRET: z.string(),
    RECREATE_SEARCH_INDEX_SECRET: z.string(),
    POSTGRES_MAX_CONNECTIONS: z.string().pipe(z.coerce.number().int().min(1).max(9999)),
    STRIPE_PAYMENT_METHODS_CONFIGURATION_ID: z.string(),
  },

	/**
	 * Specify your client-side environment variables schema here. This way you can ensure the app
	 * isn't built with invalid env vars. To expose them to the client, prefix them with
	 * `NEXT_PUBLIC_`.
	 */
	client: {
		NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
		NEXT_PUBLIC_SUPABASE_URL: urlValidation,
		NEXT_PUBLIC_WEBSITE_URL: urlValidation,
		NEXT_PUBLIC_MAXIMUM_FILE_UPLOAD_SIZE_IN_MB: z.string().pipe(z.coerce.number().int().min(1).max(999)),
		NEXT_PUBLIC_MEILISEARCH_PUBLIC_URL: urlValidation,
		NEXT_PUBLIC_MEILISEARCH_TENANT_TOKEN_EXPIRATION_TIME_MS: z.string().pipe(z.coerce.number().int().min(10_000)),
		NEXT_PUBLIC_SIGN_UP_DEFAULT_EMAIL: z.string().email().optional(),
		NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT: z.enum(["development", "staging", "production"]),
		NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),
    NEXT_PUBLIC_RESEND_EMAIL_CONFIRMATION_TIMEOUT_IN_SECONDS: z.string().pipe(z.coerce.number().int().min(1).max(3600)),
    NEXT_PUBLIC_PROFILE_PICTURE_STALE_TIME_IN_SECONDS: z.string().pipe(z.coerce.number().int().min(1).max(36000)),
    NEXT_PUBLIC_APP_NAME: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side, so we need to destruct manually.
   */
  runtimeEnv: {
    NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT: process.env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    NEXT_PUBLIC_SIGN_UP_DEFAULT_EMAIL: process.env.NEXT_PUBLIC_SIGN_UP_DEFAULT_EMAIL,
    CAISY_API_KEY: process.env.CAISY_API_KEY,
    CAISY_PROJECT_ID: process.env.CAISY_PROJECT_ID,
    NEXT_PUBLIC_WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL,
    NEXT_PUBLIC_MAXIMUM_FILE_UPLOAD_SIZE_IN_MB: process.env.NEXT_PUBLIC_MAXIMUM_FILE_UPLOAD_SIZE_IN_MB,
    THROTTLE_REQUESTS_IN_MS: process.env.THROTTLE_REQUESTS_IN_MS,
    GOOGLE_CLOUD_STORAGE_PROJECT_ID: process.env.GOOGLE_CLOUD_STORAGE_PROJECT_ID,
    GOOGLE_CLOUD_STORAGE_BUCKET_NAME: process.env.GOOGLE_CLOUD_STORAGE_BUCKET_NAME,
    GOOGLE_SERVICE_ACCOUNT_BASE64: process.env.GOOGLE_SERVICE_ACCOUNT_BASE64,
    NEXT_PUBLIC_MEILISEARCH_PUBLIC_URL: process.env.NEXT_PUBLIC_MEILISEARCH_PUBLIC_URL,
    MEILISEARCH_HOST_URL: process.env.MEILISEARCH_HOST_URL,
    MEILISEARCH_MASTER_API_KEY: process.env.MEILISEARCH_MASTER_API_KEY,
    NEXT_PUBLIC_MEILISEARCH_TENANT_TOKEN_EXPIRATION_TIME_MS: process.env.NEXT_PUBLIC_MEILISEARCH_TENANT_TOKEN_EXPIRATION_TIME_MS,
    CAISY_WEBHOOKS_SECRET_KEY: process.env.CAISY_WEBHOOKS_SECRET_KEY,
    CAISY_CASE_BLUEPRINT_ID: process.env.CAISY_CASE_BLUEPRINT_ID,
    CAISY_ARTICLE_BLUEPRINT_ID: process.env.CAISY_ARTICLE_BLUEPRINT_ID,
    CAISY_TAG_BLUEPRINT_ID: process.env.CAISY_TAG_BLUEPRINT_ID,
    CAISY_MAIN_CATEGORY_BLUEPRINT_ID: process.env.CAISY_MAIN_CATEGORY_BLUEPRINT_ID,
    CAISY_LEGAL_AREA_BLUEPRINT_ID: process.env.CAISY_LEGAL_AREA_BLUEPRINT_ID,
    CAISY_TOPIC_BLUEPRINT_ID: process.env.CAISY_TOPIC_BLUEPRINT_ID,
    CRON_SECRET: process.env.CRON_SECRET,
    STRIPE_SIGNING_SECRET: process.env.STRIPE_SIGNING_SECRET,
    STRIPE_PREMIUM_PLAN_PRICE_ID: process.env.STRIPE_PREMIUM_PLAN_PRICE_ID,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_RESEND_EMAIL_CONFIRMATION_TIMEOUT_IN_SECONDS: process.env.NEXT_PUBLIC_RESEND_EMAIL_CONFIRMATION_TIMEOUT_IN_SECONDS,
    NEXT_PUBLIC_PROFILE_PICTURE_STALE_TIME_IN_SECONDS: process.env.NEXT_PUBLIC_PROFILE_PICTURE_STALE_TIME_IN_SECONDS,
    RECREATE_SEARCH_INDEX_SECRET: process.env.RECREATE_SEARCH_INDEX_SECRET,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    POSTGRES_MAX_CONNECTIONS: process.env.POSTGRES_MAX_CONNECTIONS,
    STRIPE_PAYMENT_METHODS_CONFIGURATION_ID: process.env.STRIPE_PAYMENT_METHODS_CONFIGURATION_ID,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
