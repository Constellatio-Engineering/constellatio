ALTER TABLE "GameProgress" DROP CONSTRAINT "GameProgress_UserId_GameId_unique";--> statement-breakpoint
ALTER TABLE "GameProgress" DROP COLUMN IF EXISTS "UpdatedAt";