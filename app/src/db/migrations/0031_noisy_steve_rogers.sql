DO $$ BEGIN
 CREATE TYPE "SubscriptionStatus" AS ENUM('active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'trialing', 'unpaid', 'paused');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "User" ALTER COLUMN "SubscriptionStatus" SET DATA TYPE SubscriptionStatus;--> statement-breakpoint
ALTER TABLE "User" DROP COLUMN IF EXISTS "SubscriptionPeriod";