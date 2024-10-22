ALTER TABLE "User" ALTER COLUMN "DisplayName" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "User" ALTER COLUMN "FirstName" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "User" ALTER COLUMN "LastName" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "wasSignupCompleted" boolean DEFAULT false;