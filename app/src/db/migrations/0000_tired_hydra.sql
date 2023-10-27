DO $$ BEGIN
 CREATE TYPE "CaseProgressState" AS ENUM('not-started', 'completing-tests', 'solving-case', 'completed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "DocumentFileExtension" AS ENUM('pdf');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "DocumentFileMimeType" AS ENUM('application/pdf');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "FileExtension" AS ENUM('jpg', 'jpeg', 'png', 'pdf');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "FileMimeType" AS ENUM('image/jpeg', 'image/png', 'application/pdf');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "GameProgressState" AS ENUM('not-started', 'completed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "Gender" AS ENUM('male', 'female', 'diverse');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "ImageFileExtension" AS ENUM('jpg', 'jpeg', 'png');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "ImageFileMimeType" AS ENUM('image/jpeg', 'image/png');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "OnboardingResult" AS ENUM('skipped', 'completed');
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
DO $$ BEGIN
 CREATE TYPE "SearchIndexType" AS ENUM('article', 'case');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "SubscriptionStatus" AS ENUM('active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'trialing', 'unpaid', 'paused');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ArticleView" (
	"UserId" uuid NOT NULL,
	"ArticleId" uuid NOT NULL,
	CONSTRAINT ArticleView_UserId_ArticleId PRIMARY KEY("UserId","ArticleId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Bookmark" (
	"Id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"UserId" uuid NOT NULL,
	"ResourceType" "ResourceType" NOT NULL,
	"CreatedAt" timestamp DEFAULT now() NOT NULL,
	"ResourceId" uuid NOT NULL,
	CONSTRAINT "Bookmark_Id_unique" UNIQUE("Id"),
	CONSTRAINT "Bookmark_ResourceType_ResourceId_UserId_unique" UNIQUE("ResourceType","ResourceId","UserId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "CaseProgress" (
	"CaseId" uuid NOT NULL,
	"UserId" uuid NOT NULL,
	"ProgressState" "CaseProgressState" DEFAULT 'not-started' NOT NULL,
	CONSTRAINT CaseProgress_UserId_CaseId PRIMARY KEY("UserId","CaseId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "CaseSolution" (
	"CaseId" uuid NOT NULL,
	"UserId" uuid NOT NULL,
	"Solution" text NOT NULL,
	CONSTRAINT CaseSolution_UserId_CaseId PRIMARY KEY("UserId","CaseId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "CaseView" (
	"UserId" uuid NOT NULL,
	"CaseId" uuid NOT NULL,
	CONSTRAINT CaseView_UserId_CaseId PRIMARY KEY("UserId","CaseId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Document" (
	"Id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"UserId" uuid NOT NULL,
	"CreatedAt" timestamp DEFAULT now() NOT NULL,
	"UpdatedAt" timestamp DEFAULT now() NOT NULL,
	"FolderId" uuid,
	"Name" text NOT NULL,
	"Content" text NOT NULL,
	CONSTRAINT "Document_Id_unique" UNIQUE("Id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "GameProgress" (
	"GameId" uuid NOT NULL,
	"UserId" uuid NOT NULL,
	"ProgressState" "GameProgressState" DEFAULT 'not-started' NOT NULL,
	CONSTRAINT GameProgress_UserId_GameId PRIMARY KEY("UserId","GameId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Note" (
	"Id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"UserId" uuid NOT NULL,
	"FileId" uuid NOT NULL,
	"CreatedAt" timestamp DEFAULT now() NOT NULL,
	"UpdatedAt" timestamp DEFAULT now() NOT NULL,
	"Content" text NOT NULL,
	CONSTRAINT "Note_Id_unique" UNIQUE("Id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ProfilePicture" (
	"Id" uuid PRIMARY KEY NOT NULL,
	"ServerFilename" text NOT NULL,
	"FileExtension" "ImageFileExtension" NOT NULL,
	"ContentType" "ImageFileMimeType" NOT NULL,
	"UserId" uuid NOT NULL,
	CONSTRAINT "ProfilePicture_Id_unique" UNIQUE("Id"),
	CONSTRAINT "ProfilePicture_UserId_unique" UNIQUE("UserId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "SearchIndexUpdateQueue" (
	"CmsId" uuid PRIMARY KEY NOT NULL,
	"ResourceType" "SearchIndexType" NOT NULL,
	CONSTRAINT "SearchIndexUpdateQueue_CmsId_unique" UNIQUE("CmsId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UploadFolder" (
	"Id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"CreatedAt" timestamp DEFAULT now() NOT NULL,
	"UserId" uuid NOT NULL,
	"Name" text NOT NULL,
	CONSTRAINT "UploadFolder_Id_unique" UNIQUE("Id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UploadedFile" (
	"Id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"UserId" uuid NOT NULL,
	"CreatedAt" timestamp DEFAULT now() NOT NULL,
	"FolderId" uuid,
	"ServerFilename" text NOT NULL,
	"OriginalFilename" text NOT NULL,
	"SizeInBytes" integer NOT NULL,
	"FileExtension" "FileExtension" NOT NULL,
	"ContentType" "FileMimeType" NOT NULL,
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
	"OnboardingResult" "OnboardingResult",
	"SubscriptionStatus" "SubscriptionStatus",
	"SubscriptionStartDate" timestamp,
	"SubscriptionEndDate" timestamp,
	"SubscribedPlanPriceId" text,
	CONSTRAINT "User_Id_unique" UNIQUE("Id"),
	CONSTRAINT "User_Email_unique" UNIQUE("Email")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ArticleId_Index" ON "ArticleView" ("ArticleId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CaseId_UserId_Index" ON "CaseProgress" ("UserId","CaseId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CaseId_UserId_Index" ON "CaseSolution" ("UserId","CaseId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CaseId_Index" ON "CaseView" ("CaseId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "GameId_UserId_Index" ON "GameProgress" ("UserId","GameId");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ArticleView" ADD CONSTRAINT "ArticleView_UserId_User_Id_fk" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_UserId_User_Id_fk" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "CaseProgress" ADD CONSTRAINT "CaseProgress_UserId_User_Id_fk" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "CaseSolution" ADD CONSTRAINT "CaseSolution_UserId_User_Id_fk" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "CaseView" ADD CONSTRAINT "CaseView_UserId_User_Id_fk" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE no action ON UPDATE no action;
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
 ALTER TABLE "GameProgress" ADD CONSTRAINT "GameProgress_UserId_User_Id_fk" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Note" ADD CONSTRAINT "Note_UserId_User_Id_fk" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Note" ADD CONSTRAINT "Note_FileId_UploadedFile_Id_fk" FOREIGN KEY ("FileId") REFERENCES "UploadedFile"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ProfilePicture" ADD CONSTRAINT "ProfilePicture_UserId_User_Id_fk" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE no action ON UPDATE no action;
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
