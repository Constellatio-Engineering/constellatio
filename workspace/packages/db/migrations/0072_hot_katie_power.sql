-- Custom SQL migration file, put you code below! --

ALTER TABLE "public"."SearchIndexUpdateQueue" ALTER COLUMN "SearchIndexType" SET DATA TYPE text;
DROP TYPE "public"."SearchIndexType";
CREATE TYPE "public"."SearchIndexType" AS ENUM('articles', 'cases', 'forum-questions', 'tags', 'user-documents', 'user-uploads');
ALTER TABLE "public"."SearchIndexUpdateQueue" ALTER COLUMN "SearchIndexType" SET DATA TYPE "public"."SearchIndexType" USING "SearchIndexType"::"public"."SearchIndexType";
