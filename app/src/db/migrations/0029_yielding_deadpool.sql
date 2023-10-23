DO $$ BEGIN
 CREATE TYPE "SubscriptionStatus" AS ENUM('active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'trialing', 'unpaid', 'paused');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "SubscriptionStatus" "SubscriptionStatus";--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "SubscriptionStartDate" timestamp;--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "SubscriptionEndDate" timestamp;--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "SubscribedPlanPriceId" text;