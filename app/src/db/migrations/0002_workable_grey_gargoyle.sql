DO $$ BEGIN
 CREATE TYPE "BadgeIdentifier" AS ENUM('fall-1', 'forum-power', 'disziplin', 'fall-profi-bgb-at', 'forum-profi', 'perfekte-woche', 'fall-10', '1-100', 'game-master-25', 'fall-25', 'dauerbrenner', 'game-master-3', 'fall-5', 'entschlossenheit', 'game-master-50', 'lexikon-profi-bgb-at', 'lexikon-profi-deliktsrecht', 'lexikon-profi-sachenrecht', 'lexikon-profi-bereicherungsrecht', 'favorit', 'power-user-allgemein', 'forum-1', 'feedback-1', 'ugc-1', 'forum-10', 'feedback-10', 'ugc-10', 'forum-5', 'feedback-5', 'ugc-5');
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