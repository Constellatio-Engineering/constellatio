DO $$ BEGIN
 CREATE TYPE "BadgePublicationState" AS ENUM('not-listed', 'coming-soon', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "UserBadgeState" AS ENUM('not-seen', 'seen');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "Badge" ADD COLUMN "PublicationState" "BadgePublicationState" DEFAULT 'not-listed' NOT NULL;--> statement-breakpoint
ALTER TABLE "User_to_Badge" ADD COLUMN "UserBadgeState" "UserBadgeState" DEFAULT 'not-seen' NOT NULL;