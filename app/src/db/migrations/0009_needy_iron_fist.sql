DO $$ BEGIN
 CREATE TYPE "CaseProgressState" AS ENUM('not-started', 'in-progress', 'completed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "CasesProgress" (
	"CaseId" uuid,
	"UserId" uuid NOT NULL,
	"CaseProgress" "CaseProgressState" DEFAULT 'not-started' NOT NULL,
	CONSTRAINT CasesProgress_UserId_CaseId PRIMARY KEY("UserId","CaseId")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CaseId_UserId_Index" ON "CasesProgress" ("UserId","CaseId");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "CasesProgress" ADD CONSTRAINT "CasesProgress_UserId_User_Id_fk" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
