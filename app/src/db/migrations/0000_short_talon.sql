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
 CREATE TYPE "ResourceType" AS ENUM('article', 'case', 'forumQuestion');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "Role" AS ENUM('forumMod', 'admin');
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
DO $$ BEGIN
 CREATE TYPE "UserBadgeState" AS ENUM('not-seen', 'seen');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "AnswerUpvote" (
	"UserId" uuid NOT NULL,
	"AnswerId" uuid NOT NULL,
	"CreatedAt" timestamp DEFAULT now(),
	CONSTRAINT "AnswerUpvote_UserId_AnswerId_pk" PRIMARY KEY("UserId","AnswerId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ArticleView" (
	"UserId" uuid NOT NULL,
	"ArticleId" uuid NOT NULL,
	"UpdatedAt" timestamp DEFAULT now(),
	CONSTRAINT "ArticleView_UserId_ArticleId_pk" PRIMARY KEY("UserId","ArticleId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Badge" (
	"Id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Identifier" "BadgeIdentifier" NOT NULL,
	"Name" text NOT NULL,
	"Description" text NOT NULL,
	"ImageFilename" text NOT NULL,
	"PublicationState" "BadgePublicationState" DEFAULT 'not-listed' NOT NULL,
	CONSTRAINT "Badge_Identifier_unique" UNIQUE("Identifier")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Bookmark" (
	"Id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"UserId" uuid NOT NULL,
	"ResourceType" "ResourceType" NOT NULL,
	"CreatedAt" timestamp DEFAULT now() NOT NULL,
	"ResourceId" uuid NOT NULL,
	CONSTRAINT "Bookmark_UserId_ResourceType_ResourceId_unique" UNIQUE("UserId","ResourceType","ResourceId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "CaseProgress" (
	"UserId" uuid NOT NULL,
	"CaseId" uuid NOT NULL,
	"ProgressState" "CaseProgressState" DEFAULT 'not-started' NOT NULL,
	CONSTRAINT "CaseProgress_UserId_CaseId_pk" PRIMARY KEY("UserId","CaseId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "CaseSolution" (
	"UserId" uuid NOT NULL,
	"CaseId" uuid NOT NULL,
	"Solution" text NOT NULL,
	CONSTRAINT "CaseSolution_UserId_CaseId_pk" PRIMARY KEY("UserId","CaseId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "CaseView" (
	"UserId" uuid NOT NULL,
	"CaseId" uuid NOT NULL,
	"UpdatedAt" timestamp DEFAULT now(),
	CONSTRAINT "CaseView_UserId_CaseId_Pk" PRIMARY KEY("UserId","CaseId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "CorrectAnswer" (
	"Id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ConfirmedAt" timestamp DEFAULT now() NOT NULL,
	"ConfirmedByUserId" uuid NOT NULL,
	"QuestionId" uuid NOT NULL,
	"AnswerId" uuid NOT NULL,
	CONSTRAINT "CorrectAnswer_AnswerId_unique" UNIQUE("AnswerId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Document" (
	"Id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"UserId" uuid NOT NULL,
	"CreatedAt" timestamp DEFAULT now() NOT NULL,
	"UpdatedAt" timestamp DEFAULT now() NOT NULL,
	"FolderId" uuid,
	"Name" text NOT NULL,
	"Content" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ForumAnswer" (
	"Id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Index" serial NOT NULL,
	"UserId" uuid NOT NULL,
	"CreatedAt" timestamp DEFAULT now() NOT NULL,
	"UpdatedAt" timestamp DEFAULT now() NOT NULL,
	"AnswerText" text NOT NULL,
	"ParentQuestionId" uuid,
	"ParentAnswerId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ForumQuestion_to_Subfield" (
	"QuestionId" uuid NOT NULL,
	"SubfieldId" uuid NOT NULL,
	CONSTRAINT "ForumQuestion_to_Subfield_QuestionId_SubfieldId_pk" PRIMARY KEY("QuestionId","SubfieldId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ForumQuestion_to_Topic" (
	"QuestionId" uuid NOT NULL,
	"TopicId" uuid NOT NULL,
	CONSTRAINT "ForumQuestion_to_Topic_QuestionId_TopicId_pk" PRIMARY KEY("QuestionId","TopicId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ForumQuestion" (
	"Id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Index" serial NOT NULL,
	"Slug" text NOT NULL,
	"UserId" uuid NOT NULL,
	"CreatedAt" timestamp DEFAULT now() NOT NULL,
	"UpdatedAt" timestamp DEFAULT now() NOT NULL,
	"Title" text NOT NULL,
	"Text" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ForumQuestion_to_LegalField" (
	"QuestionId" uuid NOT NULL,
	"LegalFieldId" uuid NOT NULL,
	CONSTRAINT "ForumQuestion_to_LegalField_QuestionId_LegalFieldId_pk" PRIMARY KEY("QuestionId","LegalFieldId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "GameProgress" (
	"UserId" uuid NOT NULL,
	"GameId" uuid NOT NULL,
	"ProgressState" "GameProgressState" DEFAULT 'not-started' NOT NULL,
	CONSTRAINT "GameProgress_UserId_GameId_pk" PRIMARY KEY("UserId","GameId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Note" (
	"Id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"UserId" uuid NOT NULL,
	"FileId" uuid NOT NULL,
	"CreatedAt" timestamp DEFAULT now() NOT NULL,
	"UpdatedAt" timestamp DEFAULT now() NOT NULL,
	"Content" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ProfilePicture" (
	"Id" uuid PRIMARY KEY NOT NULL,
	"ServerFilename" text NOT NULL,
	"FileExtension" "ImageFileExtension" NOT NULL,
	"ContentType" "ImageFileMimeType" NOT NULL,
	"UserId" uuid NOT NULL,
	CONSTRAINT "ProfilePicture_UserId_unique" UNIQUE("UserId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "QuestionUpvote" (
	"UserId" uuid NOT NULL,
	"QuestionId" uuid NOT NULL,
	"CreatedAt" timestamp DEFAULT now(),
	CONSTRAINT "QuestionUpvote_UserId_QuestionId_pk" PRIMARY KEY("UserId","QuestionId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "SearchIndexUpdateQueue" (
	"CmsId" uuid PRIMARY KEY NOT NULL,
	"ResourceType" "SearchIndexType" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UploadFolder" (
	"Id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"CreatedAt" timestamp DEFAULT now() NOT NULL,
	"UserId" uuid NOT NULL,
	"Name" text NOT NULL
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
	"ContentType" "FileMimeType" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UserRole" (
	"Id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Identifier" "Role" NOT NULL,
	"Name" text NOT NULL,
	"Description" text NOT NULL,
	CONSTRAINT "UserRole_Identifier_unique" UNIQUE("Identifier")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"Id" uuid PRIMARY KEY NOT NULL,
	"Email" text NOT NULL,
	"DisplayName" text NOT NULL,
	"FirstName" text NOT NULL,
	"Gender" "Gender",
	"LastName" text NOT NULL,
	"Semester" smallint,
	"StripeCustomerId" text,
	"University" text,
	"OnboardingResult" "OnboardingResult",
	"SubscriptionStatus" "SubscriptionStatus",
	"SubscriptionStartDate" timestamp,
	"SubscriptionEndDate" timestamp,
	"TrialSubscriptionId" text,
	"SubscriptionId" text,
	CONSTRAINT "User_Email_unique" UNIQUE("Email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User_to_Badge" (
	"UserId" uuid NOT NULL,
	"BadgeId" uuid NOT NULL,
	"UserBadgeState" "UserBadgeState" DEFAULT 'not-seen' NOT NULL,
	CONSTRAINT "User_to_Badge_UserId_BadgeId_pk" PRIMARY KEY("UserId","BadgeId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User_to_Role" (
	"UserId" uuid NOT NULL,
	"RoleId" uuid NOT NULL,
	CONSTRAINT "User_to_Role_UserId_RoleId_pk" PRIMARY KEY("UserId","RoleId")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "AnswerUpvote_QuestionId_Index" ON "AnswerUpvote" ("AnswerId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ArticleView_ArticleId_Index" ON "ArticleView" ("ArticleId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CaseView_CaseId_Index" ON "CaseView" ("CaseId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "ForumQuestion_Id_Slug_Index" ON "ForumQuestion" ("Id","Slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "QuestionUpvote_QuestionId_Index" ON "QuestionUpvote" ("QuestionId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "UserRole_Role_Index" ON "UserRole" ("Identifier");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "AnswerUpvote" ADD CONSTRAINT "AnswerUpvote_UserId_User_Id_fk" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "AnswerUpvote" ADD CONSTRAINT "AnswerUpvote_AnswerId_ForumAnswer_Id_fk" FOREIGN KEY ("AnswerId") REFERENCES "ForumAnswer"("Id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
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
 ALTER TABLE "CorrectAnswer" ADD CONSTRAINT "CorrectAnswer_ConfirmedByUserId_User_Id_fk" FOREIGN KEY ("ConfirmedByUserId") REFERENCES "User"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "CorrectAnswer" ADD CONSTRAINT "CorrectAnswer_QuestionId_ForumQuestion_Id_fk" FOREIGN KEY ("QuestionId") REFERENCES "ForumQuestion"("Id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "CorrectAnswer" ADD CONSTRAINT "CorrectAnswer_AnswerId_ForumAnswer_Id_fk" FOREIGN KEY ("AnswerId") REFERENCES "ForumAnswer"("Id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "ForumAnswer" ADD CONSTRAINT "ForumAnswer_UserId_User_Id_fk" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ForumAnswer" ADD CONSTRAINT "ForumAnswer_ParentQuestionId_ForumQuestion_Id_fk" FOREIGN KEY ("ParentQuestionId") REFERENCES "ForumQuestion"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ForumAnswer" ADD CONSTRAINT "ForumAnswer_ParentAnswerId_ForumAnswer_Id_fk" FOREIGN KEY ("ParentAnswerId") REFERENCES "ForumAnswer"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ForumQuestion_to_Subfield" ADD CONSTRAINT "ForumQuestion_to_Subfield_QuestionId_ForumQuestion_Id_fk" FOREIGN KEY ("QuestionId") REFERENCES "ForumQuestion"("Id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ForumQuestion_to_Topic" ADD CONSTRAINT "ForumQuestion_to_Topic_QuestionId_ForumQuestion_Id_fk" FOREIGN KEY ("QuestionId") REFERENCES "ForumQuestion"("Id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ForumQuestion" ADD CONSTRAINT "ForumQuestion_UserId_User_Id_fk" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ForumQuestion_to_LegalField" ADD CONSTRAINT "ForumQuestion_to_LegalField_QuestionId_ForumQuestion_Id_fk" FOREIGN KEY ("QuestionId") REFERENCES "ForumQuestion"("Id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "QuestionUpvote" ADD CONSTRAINT "QuestionUpvote_UserId_User_Id_fk" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "QuestionUpvote" ADD CONSTRAINT "QuestionUpvote_QuestionId_ForumQuestion_Id_fk" FOREIGN KEY ("QuestionId") REFERENCES "ForumQuestion"("Id") ON DELETE cascade ON UPDATE no action;
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
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "User_to_Role" ADD CONSTRAINT "User_to_Role_UserId_User_Id_fk" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "User_to_Role" ADD CONSTRAINT "User_to_Role_RoleId_UserRole_Id_fk" FOREIGN KEY ("RoleId") REFERENCES "UserRole"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
