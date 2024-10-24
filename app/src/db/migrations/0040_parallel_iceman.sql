-- Custom SQL migration file, put you code below! --

DO $$ BEGIN
 CREATE TYPE "public"."AuthProvider" AS ENUM('email', 'google');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint

ALTER TABLE "User" ADD COLUMN "AuthProvider" "AuthProvider";
UPDATE "User" SET "AuthProvider" = 'email';
ALTER TABLE "User" ALTER COLUMN "AuthProvider" SET NOT NULL;
