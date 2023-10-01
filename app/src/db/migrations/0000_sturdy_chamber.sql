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
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"resourceType" "resourceType" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"resourceId" uuid NOT NULL,
	CONSTRAINT "bookmarks_id_unique" UNIQUE("id"),
	CONSTRAINT "bookmarks_resourceType_resourceId_userId_unique" UNIQUE("resourceType","resourceId","userId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "uploadFolders" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"userId" uuid NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "uploadFolders_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "uploadedFiles" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"folderId" uuid,
	"serverFilename" text NOT NULL,
	"originalFilename" text NOT NULL,
	"sizeInBytes" integer NOT NULL,
	"fileExtension" text NOT NULL,
	CONSTRAINT "uploadedFiles_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"displayName" text NOT NULL,
	"firstName" text NOT NULL,
	"gender" "gender" NOT NULL,
	"lastName" text NOT NULL,
	"semester" smallint,
	"stripeCustomerId" text,
	"university" text NOT NULL,
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "uploadFolders" ADD CONSTRAINT "uploadFolders_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "uploadedFiles" ADD CONSTRAINT "uploadedFiles_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "uploadedFiles" ADD CONSTRAINT "uploadedFiles_folderId_uploadFolders_id_fk" FOREIGN KEY ("folderId") REFERENCES "uploadFolders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
