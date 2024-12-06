CREATE TYPE "public"."NotificationTypeEnum" AS ENUM('forumQuestionPosted', 'answerToForumQuestionPosted', 'forumQuestionUpvoted', 'replyToForumAnswerPosted', 'forumAnswerUpvoted', 'forumAnswerAccepted');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "NotificationType" (
	"NotificationType" "NotificationTypeEnum" PRIMARY KEY NOT NULL,
	"Name" text NOT NULL,
	"Description" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "NotificationType" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Notification" (
	"Id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Index" serial NOT NULL,
	"RecipientId" uuid NOT NULL,
	"SenderId" uuid NOT NULL,
	"ResourceId" uuid,
	"NotificationType" "NotificationTypeEnum" NOT NULL,
	"CreatedAt" timestamp DEFAULT now() NOT NULL,
	"ReadAt" timestamp,
	CONSTRAINT "sender_recipient_different" CHECK ("Notification"."SenderId" != "Notification"."RecipientId")
);
--> statement-breakpoint
ALTER TABLE "Notification" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Notification" ADD CONSTRAINT "Notification_RecipientId_User_Id_fk" FOREIGN KEY ("RecipientId") REFERENCES "public"."User"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Notification" ADD CONSTRAINT "Notification_SenderId_User_Id_fk" FOREIGN KEY ("SenderId") REFERENCES "public"."User"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Notification" ADD CONSTRAINT "Notification_NotificationType_fk" FOREIGN KEY ("NotificationType") REFERENCES "public"."NotificationType"("NotificationType") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Notification_RecipientId_FK_Index" ON "Notification" USING btree ("RecipientId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Notification_SenderId_FK_Index" ON "Notification" USING btree ("SenderId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Notification_ResourceId_FK_Index" ON "Notification" USING btree ("ResourceId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Notification_TypeIdentifier_FK_Index" ON "Notification" USING btree ("NotificationType");--> statement-breakpoint
CREATE POLICY "notifications_read_access_for_users_own_notifications" ON "Notification" AS PERMISSIVE FOR SELECT TO "authenticated" USING ("Notification"."RecipientId" = (select auth.uid()));