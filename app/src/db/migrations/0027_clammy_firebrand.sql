ALTER TABLE "SearchIndexUpdateQueue" RENAME COLUMN "CmsTitle" TO "CmsId";--> statement-breakpoint
ALTER TABLE "SearchIndexUpdateQueue" DROP CONSTRAINT "SearchIndexUpdateQueue_CmsTitle_unique";--> statement-breakpoint
ALTER TABLE "SearchIndexUpdateQueue" ADD CONSTRAINT "SearchIndexUpdateQueue_CmsId_unique" UNIQUE("CmsId");