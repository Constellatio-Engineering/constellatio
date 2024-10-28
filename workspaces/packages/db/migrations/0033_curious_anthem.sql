DO $$ BEGIN
 CREATE TYPE "public"."ContentItemViewType" AS ENUM('case', 'article', 'forumQuestion');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ContentView" (
	"id" serial PRIMARY KEY NOT NULL,
	"UserId" uuid NOT NULL,
	"ContentItemId" uuid NOT NULL,
	"CreatedAt" timestamp DEFAULT now() NOT NULL,
	"ContentItemType" "ContentItemViewType" NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ContentView" ADD CONSTRAINT "ContentView_UserId_User_Id_fk" FOREIGN KEY ("UserId") REFERENCES "public"."User"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ContentView_ContentItemId_Index" ON "ContentView" USING btree ("ContentItemId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ContentView_ContentItemType_Index" ON "ContentView" USING btree ("ContentItemType");