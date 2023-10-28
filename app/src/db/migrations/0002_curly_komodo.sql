CREATE TABLE IF NOT EXISTS "Badge" (
	"Id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Name" text NOT NULL,
	"Description" text NOT NULL,
	"ImageFilename" text NOT NULL,
	CONSTRAINT "Badge_Id_unique" UNIQUE("Id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User_to_Badge" (
	"UserId" uuid NOT NULL,
	"BadgeId" uuid NOT NULL,
	CONSTRAINT User_to_Badge_UserId_BadgeId PRIMARY KEY("UserId","BadgeId")
);
--> statement-breakpoint
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
