DO $$ BEGIN
 CREATE TYPE "public"."ProfilePictureSource" AS ENUM('internal', 'external');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "ProfilePicture" ALTER COLUMN "ServerFilename" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "ProfilePicture" ALTER COLUMN "FileExtension" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "ProfilePicture" ALTER COLUMN "ContentType" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "ReferralCode" ALTER COLUMN "UserId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "ProfilePicture" ADD COLUMN IF NOT EXISTS "Url" text;--> statement-breakpoint
ALTER TABLE "ProfilePicture" ADD COLUMN IF NOT EXISTS "ProfilePictureSource" "ProfilePictureSource";--> statement-breakpoint
UPDATE "ProfilePicture" SET "ProfilePictureSource" = 'internal';--> statement-breakpoint
ALTER TABLE "ProfilePicture" ALTER COLUMN "ProfilePictureSource" SET NOT NULL;--> statement-breakpoint
