CREATE TABLE IF NOT EXISTS "CaseSolution" (
	"CaseId" uuid NOT NULL,
	"UserId" uuid NOT NULL,
	"Solution" text NOT NULL,
	CONSTRAINT CaseSolution_UserId_CaseId PRIMARY KEY("UserId","CaseId")
);
--> statement-breakpoint
ALTER TABLE "CasesProgress" RENAME TO "CaseProgress";--> statement-breakpoint
ALTER TABLE "Case_View" RENAME TO "CaseView";--> statement-breakpoint
ALTER TABLE "CaseProgress" DROP CONSTRAINT "CasesProgress_UserId_User_Id_fk";
--> statement-breakpoint
ALTER TABLE "CaseView" DROP CONSTRAINT "Case_View_UserId_User_Id_fk";
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CaseId_UserId_Index" ON "CaseSolution" ("UserId","CaseId");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "CaseProgress" ADD CONSTRAINT "CaseProgress_UserId_User_Id_fk" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "CaseView" ADD CONSTRAINT "CaseView_UserId_User_Id_fk" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "CaseSolution" ADD CONSTRAINT "CaseSolution_UserId_User_Id_fk" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
