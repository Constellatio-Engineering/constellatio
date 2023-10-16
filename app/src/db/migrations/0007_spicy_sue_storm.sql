CREATE TABLE IF NOT EXISTS "Article_View" (
	"UserId" uuid NOT NULL,
	"ArticleId" uuid,
	CONSTRAINT Article_View_UserId_ArticleId PRIMARY KEY("UserId","ArticleId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Case_View" (
	"UserId" uuid NOT NULL,
	"CaseId" uuid,
	CONSTRAINT Case_View_UserId_CaseId PRIMARY KEY("UserId","CaseId")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ArticleId_Index" ON "Article_View" ("ArticleId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CaseId_Index" ON "Case_View" ("CaseId");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Article_View" ADD CONSTRAINT "Article_View_UserId_User_Id_fk" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Case_View" ADD CONSTRAINT "Case_View_UserId_User_Id_fk" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
