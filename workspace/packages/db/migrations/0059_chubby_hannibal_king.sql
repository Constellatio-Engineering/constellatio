CREATE POLICY "notifications_read_access_for_users_own_notifications"
    ON "Notification"
    AS PERMISSIVE
    FOR SELECT
    TO "authenticated"
    USING ("Notification"."RecipientId" = auth.uid());