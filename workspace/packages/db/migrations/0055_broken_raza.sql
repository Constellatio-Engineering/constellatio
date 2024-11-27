-- Custom SQL migration file, put you code below! --

CREATE OR REPLACE TRIGGER BOOKMARK_INSERT
    AFTER INSERT ON "public"."Bookmark"
    FOR EACH ROW
EXECUTE FUNCTION "constellatio_utils"."send_webhook"();

CREATE OR REPLACE TRIGGER USER_INSERT
    AFTER INSERT ON "public"."User"
    FOR EACH ROW
EXECUTE FUNCTION "constellatio_utils"."send_webhook"();