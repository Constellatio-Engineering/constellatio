DO $$ BEGIN
 CREATE TYPE "NotificationTypeIdentifier" AS ENUM('forumQuestionPosted', 'answerToForumQuestionPosted', 'forumQuestionUpvoted', 'replyToForumAnswerPosted', 'forumAnswerUpvoted', 'forumAnswerAccepted');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "NotificationType" (
	"NotificationTypeIdentifier" "NotificationTypeIdentifier" PRIMARY KEY NOT NULL,
	"Name" text NOT NULL,
	"Description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Notification" (
	"Id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"Index" serial NOT NULL,
	"RecipientId" uuid NOT NULL,
	"SenderId" uuid NOT NULL,
	"ResourceId" uuid,
	"NotificationTypeIdentifier" "NotificationTypeIdentifier" NOT NULL,
	"CreatedAt" timestamp DEFAULT now() NOT NULL,
	"ReadAt" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Notification" ADD CONSTRAINT "Notification_RecipientId_User_Id_fk" FOREIGN KEY ("RecipientId") REFERENCES "User"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Notification" ADD CONSTRAINT "Notification_SenderId_User_Id_fk" FOREIGN KEY ("SenderId") REFERENCES "User"("Id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Notification" ADD CONSTRAINT "Notification_NotificationTypeIdentifier_NotificationType_NotificationTypeIdentifier_fk" FOREIGN KEY ("NotificationTypeIdentifier") REFERENCES "NotificationType"("NotificationTypeIdentifier") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
