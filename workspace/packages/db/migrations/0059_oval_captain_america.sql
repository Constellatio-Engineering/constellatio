CREATE POLICY "usersToBadges_read_access_for_users_own_badges"
    ON "User_to_Badge"
    AS PERMISSIVE
    FOR SELECT
    TO "authenticated"
    USING ("User_to_Badge"."UserId" = auth.uid());
