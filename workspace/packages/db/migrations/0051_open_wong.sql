ALTER TYPE "public"."Role" ADD VALUE 'testing-user';

--> statement-breakpoint

COMMIT;

--> statement-breakpoint

INSERT INTO "UserRole" ("Identifier", "Name", "Description") VALUES
  ('testing-user', 'Testing User', 'For (internal) users that are testing the application, e.g. team members')
ON CONFLICT DO NOTHING;
