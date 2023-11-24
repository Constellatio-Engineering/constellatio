ALTER TABLE "User" ADD COLUMN "TrialSubscriptionId" text;--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "SubscriptionId" text;--> statement-breakpoint
ALTER TABLE "User" DROP COLUMN IF EXISTS "SubscribedPlanPriceId";