import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const urlValidation = z
	.string()
	.url()
	.refine((url) => !url.endsWith("/"), {
		message: "urls must not end with a trailing slash",
	});

const stringToJSONSchema = z.string().transform( ( str, ctx ) =>
{
  try
  {
    return JSON.parse( str )
  }
  catch ( e )
  {
    ctx.addIssue( { code: 'custom', message: 'Invalid JSON' } )
    return z.NEVER
  }
});

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    SUPABASE_SERVICE_ROLE_KEY: z.string(),
    DATABASE_URL: urlValidation,
    DATABASE_URL_SERVERLESS: urlValidation,
    CAISY_API_KEY: z.string(),
    CAISY_PROJECT_ID: z.string(),
    STRIPE_SECRET_KEY: z.string(),
    THROTTLE_REQUESTS_IN_MS: z.string().pipe(z.coerce.number().int().min(1)).optional(),
    GOOGLE_CLOUD_STORAGE_PROJECT_ID: z.string(),
    GOOGLE_CLOUD_STORAGE_BUCKET_NAME: z.string(),
    GOOGLE_CLOUD_STORAGE_PUBLIC_BUCKET_NAME: z.string(),
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
    CAISY_SUB_CATEGORY_BLUEPRINT_ID: z.string(),
    CRON_SECRET: z.string(),
    STRIPE_PREMIUM_PLAN_PRICE_ID: z.string(),
    STRIPE_SIGNING_SECRET: z.string(),
    RECREATE_SEARCH_INDEX_SECRET: z.string(),
    POSTGRES_MAX_CONNECTIONS: z.string().pipe(z.coerce.number().int().min(1).max(9999)),
    STRIPE_PAYMENT_METHODS_CONFIGURATION_ID: z.string(),
    KV_URL: z.string().url(),
    KV_REST_API_URL: z.string().url(),
    KV_REST_API_TOKEN: z.string(),
    KV_REST_API_READ_ONLY_TOKEN: z.string(),
    CLICKUP_API_TOKEN: z.string(),
    CLICKUP_CRM_LIST_ID: z.string(),
    CLICKUP_FEEDBACK_LIST_ID: z.string(),
    CLICKUP_CONTENT_TASKS_LIST_ID: z.string(),
    CLICKUP_REFERRAL_PAYOUT_LIST_ID: z.string(),
    CLICKUP_API_ENDPOINT: urlValidation,
    STRIPE_SDK_CONCURRENCY_LIMIT: z.string().pipe(z.coerce.number().int().min(1).max(999)),
    SYNC_USERS_TO_CRM: z.enum(["true", "false"]).transform((value) => value === "true"),
    SUPABASE_WEBHOOK_SECRET: z.string(),
  },

	/**
	 * Specify your client-side environment variables schema here. This way you can ensure the app
	 * isn't built with invalid env vars. To expose them to the client, prefix them with
	 * `NEXT_PUBLIC_`.
	 */
	client: {
    NEXT_PUBLIC_GOOGLE_TAG_MANAGER: stringToJSONSchema.pipe(z.discriminatedUnion("isEnabled", [
      z.object({
        isEnabled: z.literal(true),
        tagManagerId: z.string(),
      }),
      z.object({
        isEnabled: z.literal(false),
      }),
    ])),
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
    NEXT_PUBLIC_APP_NAME: z.string(),
    NEXT_PUBLIC_IS_IN_MAINTENANCE_MODE: z.enum(["true", "false"]).transform((value) => value === "true"),
    NEXT_PUBLIC_FORMBRICKS_HOST: z.string(),
    NEXT_PUBLIC_FORMBRICKS_ENVIRONMENT_ID: z.string(),
    NEXT_PUBLIC_USER_ACTIVITY_PING_INTERVAL_SECONDS: z.string().pipe(z.coerce.number().int().min(1).max(3600)),
    NEXT_PUBLIC_IS_REQUEST_BATCHING_DISABLED: z.enum(["true", "false"]).transform((value) => value === "true"),
    NEXT_PUBLIC_TRIAL_PERIOD_IN_DAYS: z.string().pipe(z.coerce.number().int().min(1).max(730)),
    NEXT_PUBLIC_STREAK_DAILY_TIME_ACTIVITY_THRESHOLD_SECONDS: z.string().pipe(z.coerce.number().int().min(1).max(86400)),
    NEXT_PUBLIC_CONTENT_ITEMS_VIEWS_HISTORY_DAYS_LIMIT: z.string().pipe(z.coerce.number().int().min(1).max(365))
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side, so we need to destruct manually.
   */
  runtimeEnv: {
    NEXT_PUBLIC_GOOGLE_TAG_MANAGER: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER,
    NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT: process.env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_URL_SERVERLESS: process.env.DATABASE_URL_SERVERLESS,
    NEXT_PUBLIC_IS_IN_MAINTENANCE_MODE: process.env.NEXT_PUBLIC_IS_IN_MAINTENANCE_MODE,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    NEXT_PUBLIC_SIGN_UP_DEFAULT_EMAIL: process.env.NEXT_PUBLIC_SIGN_UP_DEFAULT_EMAIL,
    CAISY_API_KEY: process.env.CAISY_API_KEY,
    CAISY_PROJECT_ID: process.env.CAISY_PROJECT_ID,
    NEXT_PUBLIC_WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL,
    NEXT_PUBLIC_MAXIMUM_FILE_UPLOAD_SIZE_IN_MB: process.env.NEXT_PUBLIC_MAXIMUM_FILE_UPLOAD_SIZE_IN_MB,
    THROTTLE_REQUESTS_IN_MS: process.env.THROTTLE_REQUESTS_IN_MS,
    GOOGLE_CLOUD_STORAGE_PROJECT_ID: process.env.GOOGLE_CLOUD_STORAGE_PROJECT_ID,
    GOOGLE_CLOUD_STORAGE_PUBLIC_BUCKET_NAME: process.env.GOOGLE_CLOUD_STORAGE_PUBLIC_BUCKET_NAME,
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
    CAISY_SUB_CATEGORY_BLUEPRINT_ID: process.env.CAISY_SUB_CATEGORY_BLUEPRINT_ID,
    CRON_SECRET: process.env.CRON_SECRET,
    STRIPE_SIGNING_SECRET: process.env.STRIPE_SIGNING_SECRET,
    STRIPE_PREMIUM_PLAN_PRICE_ID: process.env.STRIPE_PREMIUM_PLAN_PRICE_ID,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_RESEND_EMAIL_CONFIRMATION_TIMEOUT_IN_SECONDS: process.env.NEXT_PUBLIC_RESEND_EMAIL_CONFIRMATION_TIMEOUT_IN_SECONDS,
    RECREATE_SEARCH_INDEX_SECRET: process.env.RECREATE_SEARCH_INDEX_SECRET,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    POSTGRES_MAX_CONNECTIONS: process.env.POSTGRES_MAX_CONNECTIONS,
    STRIPE_PAYMENT_METHODS_CONFIGURATION_ID: process.env.STRIPE_PAYMENT_METHODS_CONFIGURATION_ID,
    NEXT_PUBLIC_FORMBRICKS_HOST: process.env.NEXT_PUBLIC_FORMBRICKS_HOST,
    NEXT_PUBLIC_FORMBRICKS_ENVIRONMENT_ID: process.env.NEXT_PUBLIC_FORMBRICKS_ENVIRONMENT_ID,
    NEXT_PUBLIC_TRIAL_PERIOD_IN_DAYS: process.env.NEXT_PUBLIC_TRIAL_PERIOD_IN_DAYS,
    NEXT_PUBLIC_USER_ACTIVITY_PING_INTERVAL_SECONDS: process.env.NEXT_PUBLIC_USER_ACTIVITY_PING_INTERVAL_SECONDS,
    KV_URL: process.env.KV_URL,
    KV_REST_API_URL: process.env.KV_REST_API_URL,
    KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,
    KV_REST_API_READ_ONLY_TOKEN: process.env.KV_REST_API_READ_ONLY_TOKEN,
    NEXT_PUBLIC_IS_REQUEST_BATCHING_DISABLED: process.env.NEXT_PUBLIC_IS_REQUEST_BATCHING_DISABLED,
    CLICKUP_API_TOKEN: process.env.CLICKUP_API_TOKEN,
    CLICKUP_CRM_LIST_ID: process.env.CLICKUP_CRM_LIST_ID,
    CLICKUP_FEEDBACK_LIST_ID: process.env.CLICKUP_FEEDBACK_LIST_ID,
    CLICKUP_CONTENT_TASKS_LIST_ID: process.env.CLICKUP_CONTENT_TASKS_LIST_ID,
    CLICKUP_REFERRAL_PAYOUT_LIST_ID: process.env.CLICKUP_REFERRAL_PAYOUT_LIST_ID,
    CLICKUP_API_ENDPOINT: process.env.CLICKUP_API_ENDPOINT,
    STRIPE_SDK_CONCURRENCY_LIMIT: process.env.STRIPE_SDK_CONCURRENCY_LIMIT,
    SYNC_USERS_TO_CRM: process.env.SYNC_USERS_TO_CRM,
    SUPABASE_WEBHOOK_SECRET: process.env.SUPABASE_WEBHOOK_SECRET,
    NEXT_PUBLIC_STREAK_DAILY_TIME_ACTIVITY_THRESHOLD_SECONDS: process.env.NEXT_PUBLIC_STREAK_DAILY_TIME_ACTIVITY_THRESHOLD_SECONDS,
    NEXT_PUBLIC_CONTENT_ITEMS_VIEWS_HISTORY_DAYS_LIMIT: process.env.NEXT_PUBLIC_CONTENT_ITEMS_VIEWS_HISTORY_DAYS_LIMIT,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
