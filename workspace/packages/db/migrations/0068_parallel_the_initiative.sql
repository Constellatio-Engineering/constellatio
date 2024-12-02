DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'Notification') THEN
        DROP POLICY IF EXISTS "notifications_read_access_for_users_own_notifications" ON "Notification";
        ALTER PUBLICATION supabase_realtime DROP TABLE "Notification";
    END IF;
END $$;

DROP INDEX IF EXISTS "Notification_RecipientId_FK_Index";--> statement-breakpoint
DROP INDEX IF EXISTS "Notification_SenderId_FK_Index";--> statement-breakpoint
DROP INDEX IF EXISTS "Notification_ResourceId_FK_Index";--> statement-breakpoint
DROP INDEX IF EXISTS "Notification_TypeIdentifier_FK_Index";--> statement-breakpoint

DROP TABLE IF EXISTS "Notification" CASCADE;--> statement-breakpoint
DROP TABLE IF EXISTS "NotificationType" CASCADE;--> statement-breakpoint

DROP TYPE IF EXISTS "public"."NotificationType";--> statement-breakpoint
DROP TYPE IF EXISTS "public"."NotificationTypeEnum";--> statement-breakpoint
DROP TYPE IF EXISTS "public"."NotificationTypeIdentifier";--> statement-breakpoint
