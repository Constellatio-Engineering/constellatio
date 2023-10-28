ALTER TABLE "UserPing" ALTER COLUMN "CreatedAt" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "UserPing" ALTER COLUMN "UpdatedAt" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "UserPing" ADD COLUMN "Locale" text;--> statement-breakpoint
ALTER TABLE "UserPing" ADD COLUMN "Timezone" text;