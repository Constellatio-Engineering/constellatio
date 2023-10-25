ALTER TABLE "UserPing" ADD COLUMN "CreatedAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "UserPing" ADD COLUMN "UpdatedAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "UserPing" DROP COLUMN IF EXISTS "CreatedAt2";--> statement-breakpoint
ALTER TABLE "UserPing" DROP COLUMN IF EXISTS "UpdatedAt2";