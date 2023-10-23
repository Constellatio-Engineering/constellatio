ALTER TABLE "User" ADD COLUMN "SubscriptionStatus" text;--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "SubscriptionStartDate" timestamp;--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "SubscriptionEndDate" timestamp;--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "SubscriptionPeriod" text;--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "PriceId" text;