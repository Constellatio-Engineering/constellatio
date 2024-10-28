ALTER TABLE "GameProgress" RENAME COLUMN "Date" TO "CreatedAt";--> statement-breakpoint
ALTER TABLE "GameProgress" ADD COLUMN "UpdatedAt" timestamp DEFAULT now() NOT NULL;