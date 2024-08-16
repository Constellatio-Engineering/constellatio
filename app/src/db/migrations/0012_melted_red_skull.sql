CREATE TABLE IF NOT EXISTS "ReferralBalance" (
	"Index" serial PRIMARY KEY NOT NULL,
	"TotalRefferalBonus" integer DEFAULT 0 NOT NULL,
	"PaidOutRefferalBonus" integer DEFAULT 0 NOT NULL,
	"CreatedAt" timestamp DEFAULT now() NOT NULL,
	"UserId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ReferralCode" (
	"Code" text PRIMARY KEY NOT NULL,
	"CreatedAt" timestamp DEFAULT now() NOT NULL,
	"UserId" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Referral" (
	"Index" serial PRIMARY KEY NOT NULL,
	"Code" text NOT NULL,
	"CreatedAt" timestamp DEFAULT now() NOT NULL,
	"ReferredUserId" uuid NOT NULL,
	"ReferringUserId" uuid NOT NULL,
	"Paid" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ReferralBalance" ADD CONSTRAINT "ReferralBalance_UserId_User_Id_fk" FOREIGN KEY ("UserId") REFERENCES "public"."User"("Id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ReferralCode" ADD CONSTRAINT "ReferralCode_UserId_User_Id_fk" FOREIGN KEY ("UserId") REFERENCES "public"."User"("Id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Referral" ADD CONSTRAINT "Referral_ReferredUserId_User_Id_fk" FOREIGN KEY ("ReferredUserId") REFERENCES "public"."User"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Referral" ADD CONSTRAINT "Referral_ReferringUserId_User_Id_fk" FOREIGN KEY ("ReferringUserId") REFERENCES "public"."User"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
