CREATE TABLE IF NOT EXISTS "ForumQuestionView" (
	"id" serial PRIMARY KEY NOT NULL,
	"UserId" uuid NOT NULL,
	"QuestionId" uuid NOT NULL,
	"CreatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ArticleView" RENAME COLUMN "UpdatedAt" TO "CreatedAt";--> statement-breakpoint
ALTER TABLE "CaseView" RENAME COLUMN "UpdatedAt" TO "CreatedAt";--> statement-breakpoint
ALTER TABLE "ArticleView" DROP CONSTRAINT "ArticleView_UserId_ArticleId_pk";--> statement-breakpoint
ALTER TABLE "CaseView" DROP CONSTRAINT "CaseView_UserId_CaseId_Pk";--> statement-breakpoint
ALTER TABLE "ArticleView" ADD COLUMN "id" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "CaseView" ADD COLUMN "id" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ForumQuestionView" ADD CONSTRAINT "ForumQuestionView_UserId_User_Id_fk" FOREIGN KEY ("UserId") REFERENCES "public"."User"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ForumQuestionView_QuestionId_Index" ON "ForumQuestionView" USING btree ("QuestionId");