CREATE TABLE IF NOT EXISTS "UpdateUserInCrmQueue" (
	"UserId" uuid NOT NULL,
	"CreatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "UpdateUserInCrmQueue_UserId_unique" UNIQUE("UserId")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UpdateUserInCrmQueue" ADD CONSTRAINT "UpdateUserInCrmQueue_UserId_User_Id_fk" FOREIGN KEY ("UserId") REFERENCES "public"."User"("Id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
