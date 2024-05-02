CREATE TABLE IF NOT EXISTS "Ping" (
	"Index" serial PRIMARY KEY NOT NULL,
	"UserId" uuid NOT NULL,
	"Path" text NOT NULL,
	"Search" text,
	"CreatedAt" timestamp DEFAULT now() NOT NULL,
	"PingInterval" smallint NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Ping_Path_Index" ON "Ping" ("Path");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Ping" ADD CONSTRAINT "Ping_UserId_User_Id_fk" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
