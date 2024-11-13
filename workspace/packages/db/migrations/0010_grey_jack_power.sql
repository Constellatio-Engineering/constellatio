DO $$ BEGIN
 CREATE TYPE "public"."CaisyWebhookEventType" AS ENUM('upsert', 'delete');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TYPE "SearchIndexType" ADD VALUE 'articles';--> statement-breakpoint
ALTER TYPE "SearchIndexType" ADD VALUE 'cases';--> statement-breakpoint
ALTER TYPE "SearchIndexType" ADD VALUE 'forum-questions';--> statement-breakpoint
ALTER TYPE "SearchIndexType" ADD VALUE 'tags';--> statement-breakpoint
ALTER TYPE "SearchIndexType" ADD VALUE 'user-documents';--> statement-breakpoint
ALTER TYPE "SearchIndexType" ADD VALUE 'user-uploads';--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Document_to_Tag" (
	"DocumentId" uuid NOT NULL,
	"TagId" uuid NOT NULL,
	CONSTRAINT "Document_to_Tag_DocumentId_TagId_pk" PRIMARY KEY("DocumentId","TagId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UploadedFile_to_Tag" (
	"FileId" uuid NOT NULL,
	"TagId" uuid NOT NULL,
	CONSTRAINT "UploadedFile_to_Tag_FileId_TagId_pk" PRIMARY KEY("FileId","TagId")
);
--> statement-breakpoint
ALTER TABLE "NotificationType" RENAME COLUMN "NotificationTypeIdentifier" TO "NotificationType";--> statement-breakpoint
ALTER TABLE "Notification" RENAME COLUMN "NotificationTypeIdentifier" TO "Type";--> statement-breakpoint
ALTER TABLE "SearchIndexUpdateQueue" RENAME COLUMN "ResourceType" TO "SearchIndexType";--> statement-breakpoint
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_NotificationTypeIdentifier_NotificationType_NotificationTypeIdentifier_fk";
--> statement-breakpoint

ALTER TABLE "SearchIndexUpdateQueue" DROP CONSTRAINT IF EXISTS "SearchIndexUpdateQueue_pkey";--> statement-breakpoint
ALTER TABLE "SearchIndexUpdateQueue" ADD COLUMN "EventType" "CaisyWebhookEventType" NOT NULL;--> statement-breakpoint
ALTER TABLE "SearchIndexUpdateQueue" ADD CONSTRAINT "SearchIndexUpdateQueue_CmsId_SearchIndexType_EventType_pk" PRIMARY KEY("CmsId","SearchIndexType","EventType");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Document_to_Tag" ADD CONSTRAINT "Document_to_Tag_DocumentId_Document_Id_fk" FOREIGN KEY ("DocumentId") REFERENCES "public"."Document"("Id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UploadedFile_to_Tag" ADD CONSTRAINT "UploadedFile_to_Tag_FileId_UploadedFile_Id_fk" FOREIGN KEY ("FileId") REFERENCES "public"."UploadedFile"("Id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Notification" ADD CONSTRAINT "Notification_Type_NotificationType_NotificationType_fk" FOREIGN KEY ("Type") REFERENCES "public"."NotificationType"("NotificationType") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
