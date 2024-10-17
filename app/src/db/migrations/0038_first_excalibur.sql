-- Custom SQL migration file, put you code below! --

CREATE OR REPLACE TRIGGER BOOKMARK_INSERT
    AFTER UPDATE ON "public"."Bookmark"
    FOR EACH ROW
EXECUTE FUNCTION "constellatio_utils"."send_webhook"();
