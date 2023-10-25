ALTER TABLE "UserPing" ADD COLUMN "CreatedAt2" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "UserPing" ADD COLUMN "UpdatedAt2" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "UserPing" DROP COLUMN IF EXISTS "CreatedAt";--> statement-breakpoint
ALTER TABLE "UserPing" DROP COLUMN IF EXISTS "UpdatedAt";