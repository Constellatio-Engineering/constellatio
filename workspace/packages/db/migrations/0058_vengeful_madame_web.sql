-- Custom SQL migration file, put you code below! --

CREATE OR REPLACE TRIGGER UPLOADED_FILE_INSERT
    AFTER INSERT ON "public"."UploadedFile"
    FOR EACH ROW
EXECUTE FUNCTION "constellatio_utils"."send_webhook"();

CREATE OR REPLACE TRIGGER CORRECT_ANSWER_INSERT
    AFTER INSERT ON "public"."CorrectAnswer"
    FOR EACH ROW
EXECUTE FUNCTION "constellatio_utils"."send_webhook"();