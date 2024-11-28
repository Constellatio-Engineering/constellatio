DELETE FROM "Notification" WHERE "SenderId" = "RecipientId";
ALTER TABLE "Notification" ADD CONSTRAINT "sender_recipient_different" CHECK ("Notification"."SenderId" != "Notification"."RecipientId");