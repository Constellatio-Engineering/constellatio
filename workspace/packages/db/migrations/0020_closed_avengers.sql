-- Custom SQL migration file, put you code below! --
CREATE OR REPLACE TRIGGER PING_INSERT
    AFTER INSERT ON "public"."Ping"
    FOR EACH ROW
EXECUTE FUNCTION "constellatio_utils"."send_webhook"();

CREATE OR REPLACE TRIGGER FORUM_ANSWER_INSERT
    AFTER INSERT ON "public"."ForumAnswer"
    FOR EACH ROW
EXECUTE FUNCTION "constellatio_utils"."send_webhook"();

CREATE OR REPLACE TRIGGER FORUM_QUESTION_INSERT
    AFTER INSERT ON "public"."ForumQuestion"
    FOR EACH ROW
EXECUTE FUNCTION "constellatio_utils"."send_webhook"();

CREATE OR REPLACE TRIGGER CASE_PROGRESS_INSERT
    AFTER INSERT ON "public"."CaseProgress"
    FOR EACH ROW
EXECUTE FUNCTION "constellatio_utils"."send_webhook"();

CREATE OR REPLACE TRIGGER CASE_PROGRESS_UPDATE
    AFTER UPDATE ON "public"."CaseProgress"
    FOR EACH ROW
EXECUTE FUNCTION "constellatio_utils"."send_webhook"();