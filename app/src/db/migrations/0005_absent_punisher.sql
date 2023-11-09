CREATE TABLE IF NOT EXISTS "UserPing" (
	"Id" serial PRIMARY KEY NOT NULL,
	"UserId" uuid,
	"CreatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"UpdatedAt" timestamp DEFAULT now() NOT NULL,
	"Url" text NOT NULL,
	"pingCount" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserPing" ADD CONSTRAINT "UserPing_UserId_User_Id_fk" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
