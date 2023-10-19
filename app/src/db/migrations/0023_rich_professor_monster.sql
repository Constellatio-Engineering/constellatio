DO $$ BEGIN
 CREATE TYPE "SearchIndexType" AS ENUM('article', 'case');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "SearchIndexUpdateQueue" (
	"CmsId" uuid PRIMARY KEY NOT NULL,
	"ResourceType" "SearchIndexType" NOT NULL,
	CONSTRAINT "SearchIndexUpdateQueue_CmsId_unique" UNIQUE("CmsId")
);
