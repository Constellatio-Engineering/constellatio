ALTER POLICY "notifications_read_access_for_users_own_notifications"
    ON "Notification"
    TO authenticated
    USING ("Notification"."RecipientId" = (select auth.uid()));

--> statement-breakpoint

ALTER POLICY "usersToBadges_read_access_for_users_own_badges"
    ON "User_to_Badge"
    TO authenticated
    USING ("User_to_Badge"."UserId" = (select auth.uid()));