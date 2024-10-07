ALTER TABLE "GameProgress" ADD COLUMN "Id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "GameProgress" ADD COLUMN "Date" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "GameProgress" ADD COLUMN "GameResult" jsonb;