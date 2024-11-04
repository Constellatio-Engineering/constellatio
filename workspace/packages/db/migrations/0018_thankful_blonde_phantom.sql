DO $$ BEGIN
 CREATE TYPE "public"."StreakActivityType" AS ENUM('time', 'solvedCase', 'forumActivity');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Streak" (
	"id" serial PRIMARY KEY NOT NULL,
	"UserId" uuid NOT NULL,
	"StartDate" date DEFAULT now() NOT NULL,
	"LastSatisfiedDate" date DEFAULT now() NOT NULL,
	"SatisfiedDays" integer DEFAULT 1,
	"StreakAlive" boolean DEFAULT true,
	"LastCheckDate" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "StreakActivities" (
	"id" serial PRIMARY KEY NOT NULL,
	"UserId" uuid NOT NULL,
	"ActivityType" "StreakActivityType" NOT NULL,
	"CreatedAt" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Streak" ADD CONSTRAINT "Streak_UserId_User_Id_fk" FOREIGN KEY ("UserId") REFERENCES "public"."User"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "StreakActivities" ADD CONSTRAINT "StreakActivities_UserId_User_Id_fk" FOREIGN KEY ("UserId") REFERENCES "public"."User"("Id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
