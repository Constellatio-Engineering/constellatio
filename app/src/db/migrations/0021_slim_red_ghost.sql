DO $$ BEGIN
 CREATE TYPE "OnboardingResult" AS ENUM('skipped', 'completed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "OnboardingResult" "OnboardingResult";