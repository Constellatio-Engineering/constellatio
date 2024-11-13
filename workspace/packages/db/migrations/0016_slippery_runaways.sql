-- Custom SQL migration file, put you code below! --

create schema if not exists "constellatio_utils";

DO $$ BEGIN
    CREATE TYPE "EnvironmentVariableKey" AS ENUM('webhook_url', 'webhook_headers');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "EnvironmentVariableType" AS ENUM('string', 'number', 'boolean', 'array', 'object');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

create table if not exists "constellatio_utils"."EnvironmentVariables"
(
    "Key" "EnvironmentVariableKey" primary key,
    "Value" text not null,
    "Description" text not null,
    "Type" "EnvironmentVariableType" NOT NULL,
    "CreatedAt" timestamp DEFAULT now() NOT NULL,
    "UpdatedAt" timestamp DEFAULT now() NOT NULL
);

CREATE OR REPLACE FUNCTION "constellatio_utils"."send_webhook" ()
    RETURNS TRIGGER
    SECURITY DEFINER
    LANGUAGE plpgsql
AS $$
DECLARE
    request_id bigint;
    payload jsonb;
    url text;
    headers jsonb;
    params jsonb DEFAULT '{}'::jsonb;
    timeout_ms integer DEFAULT 1000;
BEGIN
    SELECT "Value" INTO url FROM "constellatio_utils"."EnvironmentVariables" WHERE "Key" = 'webhook_url';
    SELECT "Value" INTO headers FROM "constellatio_utils"."EnvironmentVariables" WHERE "Key" = 'webhook_headers';

    IF url IS NULL OR url = '' THEN
        RAISE EXCEPTION 'Webhook URL is missing in the constellatio_utils.EnvironmentVariables table';
    END IF;

    IF headers IS NULL OR headers = '{}' THEN
        RAISE EXCEPTION 'Webhook headers are missing in the constellatio_utils.EnvironmentVariables table';
    END IF;

    payload = jsonb_build_object(
            'old_record', OLD,
            'record', NEW,
            'type', TG_OP,
            'table', TG_TABLE_NAME,
            'schema', TG_TABLE_SCHEMA
              );

    SELECT http_post INTO request_id FROM net.http_post(
            url,
            payload,
            params,
            headers,
            timeout_ms
                                          );

    INSERT INTO "supabase_functions"."hooks" (hook_table_id, hook_name, request_id) VALUES (TG_RELID, TG_NAME, request_id);

    RETURN NEW;
END
$$;
