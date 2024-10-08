ALTER TABLE "GameProgress" DROP CONSTRAINT "GameProgress_UserId_GameId_pk";--> statement-breakpoint
ALTER TABLE "ArticleView" ALTER COLUMN "UpdatedAt" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "CaseView" ALTER COLUMN "UpdatedAt" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "GameProgress" ADD CONSTRAINT "GameProgress_UserId_GameId_unique" UNIQUE("UserId","GameId");