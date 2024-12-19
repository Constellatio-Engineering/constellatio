ALTER TYPE "public"."Role" ADD VALUE 'forum-constellatio-authority';--> statement-breakpoint
ALTER TYPE "public"."Role" ADD VALUE 'forum-legal-authority';--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "ExternalAuthorityUrl" text;--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "ExternalAuthorityDisplayName" text;