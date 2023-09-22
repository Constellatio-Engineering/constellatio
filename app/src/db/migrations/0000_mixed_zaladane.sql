DO $$ BEGIN
 CREATE TYPE "gender" AS ENUM('male', 'female', 'diverse');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "resourceType" AS ENUM('article', 'case');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookmarks" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"resourceType" "resourceType" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"resourceId" uuid NOT NULL,
	CONSTRAINT "bookmarks_uuid_unique" UNIQUE("uuid"),
	CONSTRAINT "bookmarks_resourceType_resourceId_userId_unique" UNIQUE("resourceType","resourceId","userId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "uploads" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
	"clientSideUuid" uuid NOT NULL,
	"userId" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"filename" text NOT NULL,
	"originalFilename" text NOT NULL,
	"sizeInBytes" integer NOT NULL,
	"fileExtension" text NOT NULL,
	CONSTRAINT "uploads_uuid_unique" UNIQUE("uuid")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid NOT NULL,
	"email" text NOT NULL,
	"displayName" text NOT NULL,
	"firstName" text NOT NULL,
	"gender" "gender" NOT NULL,
	"lastName" text NOT NULL,
	"semester" smallint,
	"university" text NOT NULL,
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "uploads" ADD CONSTRAINT "uploads_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
