DO $$ BEGIN
 CREATE TYPE "Role" AS ENUM('forumMod', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TYPE "ResourceType" ADD VALUE 'forumQuestion';--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "AnswerUpvote" (
	"UserId" uuid NOT NULL,
	"AnswerId" uuid NOT NULL,
	"CreatedAt" timestamp DEFAULT now(),
	CONSTRAINT "AnswerUpvote_UserId_AnswerId_pk" PRIMARY KEY("UserId","AnswerId")
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
CREATE TABLE IF NOT EXISTS "ForumQuestion" (
	"Id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Index" serial NOT NULL,
	"Slug" text NOT NULL,
	"UserId" uuid NOT NULL,
	"CreatedAt" timestamp DEFAULT now() NOT NULL,
	"UpdatedAt" timestamp DEFAULT now() NOT NULL,
	"Title" text NOT NULL,
	"Text" text NOT NULL,
	"LegalFieldId" uuid NOT NULL,
	"SubfieldId" uuid,
	"TopicId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "QuestionUpvote" (
	"UserId" uuid NOT NULL,
	"QuestionId" uuid NOT NULL,
	"CreatedAt" timestamp DEFAULT now(),
	CONSTRAINT "QuestionUpvote_UserId_QuestionId_pk" PRIMARY KEY("UserId","QuestionId")
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
CREATE TABLE IF NOT EXISTS "User_to_Role" (
	"UserId" uuid NOT NULL,
	"RoleId" uuid NOT NULL,
	CONSTRAINT "User_to_Role_UserId_RoleId_pk" PRIMARY KEY("UserId","RoleId")
);
--> statement-breakpoint
ALTER TABLE "Badge" DROP CONSTRAINT "Badge_Id_unique";--> statement-breakpoint
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_Id_unique";--> statement-breakpoint
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_ResourceType_ResourceId_UserId_unique";--> statement-breakpoint
ALTER TABLE "Document" DROP CONSTRAINT "Document_Id_unique";--> statement-breakpoint
ALTER TABLE "Note" DROP CONSTRAINT "Note_Id_unique";--> statement-breakpoint
ALTER TABLE "ProfilePicture" DROP CONSTRAINT "ProfilePicture_Id_unique";--> statement-breakpoint
ALTER TABLE "SearchIndexUpdateQueue" DROP CONSTRAINT "SearchIndexUpdateQueue_CmsId_unique";--> statement-breakpoint
ALTER TABLE "UploadFolder" DROP CONSTRAINT "UploadFolder_Id_unique";--> statement-breakpoint
ALTER TABLE "UploadedFile" DROP CONSTRAINT "UploadedFile_Id_unique";--> statement-breakpoint
ALTER TABLE "User" DROP CONSTRAINT "User_Id_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "ArticleId_Index";--> statement-breakpoint
DROP INDEX IF EXISTS "CaseId_UserId_Index";--> statement-breakpoint
DROP INDEX IF EXISTS "CaseId_Index";--> statement-breakpoint
DROP INDEX IF EXISTS "GameId_UserId_Index";--> statement-breakpoint
ALTER TABLE "ArticleView" DROP CONSTRAINT "ArticleView_UserId_ArticleId";--> statement-breakpoint
ALTER TABLE "CaseProgress" DROP CONSTRAINT "CaseProgress_UserId_CaseId";--> statement-breakpoint
ALTER TABLE "CaseSolution" DROP CONSTRAINT "CaseSolution_UserId_CaseId";--> statement-breakpoint
ALTER TABLE "CaseView" DROP CONSTRAINT "CaseView_UserId_CaseId";--> statement-breakpoint
ALTER TABLE "GameProgress" DROP CONSTRAINT "GameProgress_UserId_GameId";--> statement-breakpoint
ALTER TABLE "User_to_Badge" DROP CONSTRAINT "User_to_Badge_UserId_BadgeId";--> statement-breakpoint
ALTER TABLE "ArticleView" ADD CONSTRAINT "ArticleView_UserId_ArticleId_pk" PRIMARY KEY("UserId","ArticleId");--> statement-breakpoint
ALTER TABLE "CaseProgress" ADD CONSTRAINT "CaseProgress_UserId_CaseId_pk" PRIMARY KEY("UserId","CaseId");--> statement-breakpoint
ALTER TABLE "CaseSolution" ADD CONSTRAINT "CaseSolution_UserId_CaseId_pk" PRIMARY KEY("UserId","CaseId");--> statement-breakpoint
ALTER TABLE "CaseView" ADD CONSTRAINT "CaseView_UserId_CaseId_Pk" PRIMARY KEY("UserId","CaseId");--> statement-breakpoint
ALTER TABLE "GameProgress" ADD CONSTRAINT "GameProgress_UserId_GameId_pk" PRIMARY KEY("UserId","GameId");--> statement-breakpoint
ALTER TABLE "User_to_Badge" ADD CONSTRAINT "User_to_Badge_UserId_BadgeId_pk" PRIMARY KEY("UserId","BadgeId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "AnswerUpvote_QuestionId_Index" ON "AnswerUpvote" ("AnswerId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "ForumQuestion_Id_Slug_Index" ON "ForumQuestion" ("Id","Slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "QuestionUpvote_QuestionId_Index" ON "QuestionUpvote" ("QuestionId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "UserRole_Role_Index" ON "UserRole" ("Identifier");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ArticleView_ArticleId_Index" ON "ArticleView" ("ArticleId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CaseView_CaseId_Index" ON "CaseView" ("CaseId");--> statement-breakpoint
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
 ALTER TABLE "CorrectAnswer" ADD CONSTRAINT "CorrectAnswer_ConfirmedByUserId_User_Id_fk" FOREIGN KEY ("ConfirmedByUserId") REFERENCES "User"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "CorrectAnswer" ADD CONSTRAINT "CorrectAnswer_QuestionId_ForumQuestion_Id_fk" FOREIGN KEY ("QuestionId") REFERENCES "ForumQuestion"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "CorrectAnswer" ADD CONSTRAINT "CorrectAnswer_AnswerId_ForumAnswer_Id_fk" FOREIGN KEY ("AnswerId") REFERENCES "ForumAnswer"("Id") ON DELETE no action ON UPDATE no action;
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
 ALTER TABLE "ForumQuestion" ADD CONSTRAINT "ForumQuestion_UserId_User_Id_fk" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE no action ON UPDATE no action;
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
--> statement-breakpoint
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_UserId_ResourceType_ResourceId_unique" UNIQUE("UserId","ResourceType","ResourceId");