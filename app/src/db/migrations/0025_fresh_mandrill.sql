ALTER TABLE "SearchIndexUpdateQueue" RENAME COLUMN "CmsId" TO "CmsTitle";--> statement-breakpoint
ALTER TABLE "SearchIndexUpdateQueue" DROP CONSTRAINT "SearchIndexUpdateQueue_CmsId_unique";--> statement-breakpoint
ALTER TABLE "SearchIndexUpdateQueue" ADD CONSTRAINT "SearchIndexUpdateQueue_CmsTitle_unique" UNIQUE("CmsTitle");