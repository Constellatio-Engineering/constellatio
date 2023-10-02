DO $$ BEGIN
 CREATE TYPE "Gender" AS ENUM('male', 'female', 'diverse');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "ResourceType" AS ENUM('article', 'case');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Bookmark" (
	"Id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"UserId" uuid NOT NULL,
	"ResourceType" "ResourceType" NOT NULL,
	"CreatedAt" timestamp DEFAULT now() NOT NULL,
	"ResourceId" uuid NOT NULL,
	CONSTRAINT "Bookmark_Id_unique" UNIQUE("Id"),
	CONSTRAINT "Bookmark_ResourceType_ResourceId_UserId_unique" UNIQUE("ResourceType","ResourceId","UserId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Document" (
	"Id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"UserId" uuid NOT NULL,
	"CreatedAt" timestamp DEFAULT now() NOT NULL,
	"UpdatedAt" timestamp DEFAULT now() NOT NULL,
	"FolderId" uuid,
	"Name" text NOT NULL,
	"Content" text NOT NULL,
	CONSTRAINT "Document_Id_unique" UNIQUE("Id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UploadFolder" (
	"Id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"CreatedAt" timestamp DEFAULT now() NOT NULL,
	"UserId" uuid NOT NULL,
	"Name" text NOT NULL,
	CONSTRAINT "UploadFolder_Id_unique" UNIQUE("Id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UploadedFile" (
	"Id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"UserId" uuid NOT NULL,
	"CreatedAt" timestamp DEFAULT now() NOT NULL,
	"FolderId" uuid,
	"ServerFilename" text NOT NULL,
	"OriginalFilename" text NOT NULL,
	"SizeInBytes" integer NOT NULL,
	"FileExtension" text NOT NULL,
	CONSTRAINT "UploadedFile_Id_unique" UNIQUE("Id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"Id" uuid PRIMARY KEY NOT NULL,
	"Email" text NOT NULL,
	"DisplayName" text NOT NULL,
	"FirstName" text NOT NULL,
	"Gender" "Gender" NOT NULL,
	"LastName" text NOT NULL,
	"Semester" smallint,
	"StripeCustomerId" text,
	"University" text NOT NULL,
	CONSTRAINT "User_Id_unique" UNIQUE("Id"),
	CONSTRAINT "User_Email_unique" UNIQUE("Email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_UserId_User_Id_fk" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Document" ADD CONSTRAINT "Document_UserId_User_Id_fk" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Document" ADD CONSTRAINT "Document_FolderId_UploadFolder_Id_fk" FOREIGN KEY ("FolderId") REFERENCES "UploadFolder"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UploadFolder" ADD CONSTRAINT "UploadFolder_UserId_User_Id_fk" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UploadedFile" ADD CONSTRAINT "UploadedFile_UserId_User_Id_fk" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UploadedFile" ADD CONSTRAINT "UploadedFile_FolderId_UploadFolder_Id_fk" FOREIGN KEY ("FolderId") REFERENCES "UploadFolder"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
