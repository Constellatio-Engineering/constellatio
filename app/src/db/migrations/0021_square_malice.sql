-- Custom SQL migration file, put you code below! --
CREATE OR REPLACE TRIGGER STREAK_INSERT
    AFTER INSERT ON "public"."Streak"
    FOR EACH ROW
EXECUTE FUNCTION "constellatio_utils"."send_webhook"();

CREATE OR REPLACE TRIGGER STREAK_UPDATE
    AFTER UPDATE ON "public"."Streak"
    FOR EACH ROW
EXECUTE FUNCTION "constellatio_utils"."send_webhook"();