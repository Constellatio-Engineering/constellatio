ALTER TABLE "User" RENAME COLUMN "SubscribedPlanPriceId" TO "TrailSubscriptionId";--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "SubscriptionId" text;