-- Custom SQL migration file, put you code below! --

CREATE OR REPLACE TRIGGER GAME_PROGRESS_INSERT
    AFTER INSERT ON "public"."GameProgress"
    FOR EACH ROW
EXECUTE FUNCTION "constellatio_utils"."send_webhook"();

CREATE OR REPLACE TRIGGER GAME_PROGRESS_UPDATE
    AFTER UPDATE ON "public"."GameProgress"
    FOR EACH ROW
EXECUTE FUNCTION "constellatio_utils"."send_webhook"();