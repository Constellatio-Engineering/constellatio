-- Custom SQL migration file, put you code below! --

CREATE OR REPLACE FUNCTION lowercase_email()
    RETURNS TRIGGER AS $$
BEGIN
    NEW."Email" = lower(NEW."Email");
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--> statement-breakpoint

CREATE OR REPLACE TRIGGER enforce_lowercase_email
    BEFORE INSERT OR UPDATE ON "User"
    FOR EACH ROW
EXECUTE FUNCTION lowercase_email();

--> statement-breakpoint

UPDATE "User" SET "Email" = lower("Email");