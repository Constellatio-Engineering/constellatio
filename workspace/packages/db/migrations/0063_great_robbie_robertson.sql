DO $$ BEGIN
 ALTER TABLE "User" ADD CONSTRAINT "User_Id_users_id_fk" FOREIGN KEY ("Id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
