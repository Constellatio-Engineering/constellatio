CREATE TABLE IF NOT EXISTS "ProfilePicture" (
	"Id" uuid PRIMARY KEY NOT NULL,
	"ServerFilename" text NOT NULL,
	"UserId" uuid NOT NULL,
	CONSTRAINT "ProfilePicture_Id_unique" UNIQUE("Id"),
	CONSTRAINT "ProfilePicture_UserId_unique" UNIQUE("UserId")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ProfilePicture" ADD CONSTRAINT "ProfilePicture_UserId_User_Id_fk" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
