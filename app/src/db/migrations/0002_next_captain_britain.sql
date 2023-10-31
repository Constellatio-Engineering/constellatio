DO $$ BEGIN
 CREATE TYPE "BadgeIdentifier" AS ENUM('cases-starter', 'power-user', 'longevity-champion', 'master-of-cases', 'forum-pro', 'perfect-week-achiever', 'smart-guy-10', 'one-of-100', 'play-and-learn-25', 'smart-guy-25', 'three-day-streak', 'play-and-learn-3', 'smart-guy-5', 'dedication-awardee', 'play-and-learn-50', 'master-of-dictionary', 'favorites-collector', 'power-user-1', 'active-member-1', 'feedback-guru', 'ugc-uploader-1', 'active-member-10', 'feedback-master', 'ugc-uploader-10', 'active-member-5', 'feedback-enthusiast', 'ugc-uploader-5');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
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
CREATE TABLE IF NOT EXISTS "Badge" (
	"Id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Identifier" "BadgeIdentifier" NOT NULL,
	"Name" text NOT NULL,
	"Description" text NOT NULL,
	"ImageFilename" text NOT NULL,
	"PublicationState" "BadgePublicationState" DEFAULT 'not-listed' NOT NULL,
	CONSTRAINT "Badge_Id_unique" UNIQUE("Id"),
	CONSTRAINT "Badge_Identifier_unique" UNIQUE("Identifier")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User_to_Badge" (
	"UserId" uuid NOT NULL,
	"BadgeId" uuid NOT NULL,
	"UserBadgeState" "UserBadgeState" DEFAULT 'not-seen' NOT NULL,
	CONSTRAINT User_to_Badge_UserId_BadgeId PRIMARY KEY("UserId","BadgeId")
);
--> statement-breakpoint
ALTER TABLE "User" ALTER COLUMN "University" DROP NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "User_to_Badge" ADD CONSTRAINT "User_to_Badge_UserId_User_Id_fk" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "User_to_Badge" ADD CONSTRAINT "User_to_Badge_BadgeId_Badge_Id_fk" FOREIGN KEY ("BadgeId") REFERENCES "Badge"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
