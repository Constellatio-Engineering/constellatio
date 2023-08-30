DO $$ BEGIN
 CREATE TYPE "gender" AS ENUM('male', 'female', 'diverse');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"displayName" text,
	"firstName" text,
	"gender" "gender",
	"lastName" text,
	"semester" integer,
	"test" text
);
