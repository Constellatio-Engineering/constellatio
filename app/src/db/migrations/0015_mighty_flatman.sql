DO $$ BEGIN
 CREATE TYPE "GameProgressState" AS ENUM('not-started', 'completed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "GameProgress" (
	"GameId" uuid NOT NULL,
	"UserId" uuid NOT NULL,
	"ProgressState" "GameProgressState" DEFAULT 'not-started' NOT NULL,
	CONSTRAINT GameProgress_UserId_GameId PRIMARY KEY("UserId","GameId")
);
--> statement-breakpoint
ALTER TABLE "Article_View" RENAME TO "ArticleView";--> statement-breakpoint
ALTER TABLE "ArticleView" DROP CONSTRAINT "Article_View_UserId_User_Id_fk";
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "GameId_UserId_Index" ON "GameProgress" ("UserId","GameId");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ArticleView" ADD CONSTRAINT "ArticleView_UserId_User_Id_fk" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "GameProgress" ADD CONSTRAINT "GameProgress_UserId_User_Id_fk" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
