ALTER TABLE "UpdateUserInCrmQueue" DROP CONSTRAINT "UpdateUserInCrmQueue_UserId_unique";--> statement-breakpoint
ALTER TABLE "UpdateUserInCrmQueue" ADD PRIMARY KEY ("UserId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ContentView_UserId_FK_Index" ON "ContentView" USING btree ("UserId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CorrectAnswer_UserId_FK_Index" ON "CorrectAnswer" USING btree ("ConfirmedByUserId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CorrectAnswer_QuestionId_FK_Index" ON "CorrectAnswer" USING btree ("QuestionId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "CorrectAnswer_AnswerId_FK_Index" ON "CorrectAnswer" USING btree ("AnswerId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Document_UserId_FK_Index" ON "Document" USING btree ("UserId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Document_FolderId_FK_Index" ON "Document" USING btree ("FolderId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ForumAnswer_UserId_FK_Index" ON "ForumAnswer" USING btree ("UserId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ForumAnswer_ParentQuestionId_FK_Index" ON "ForumAnswer" USING btree ("ParentQuestionId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ForumAnswer_ParentAnswerId_FK_Index" ON "ForumAnswer" USING btree ("ParentAnswerId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ForumQuestion_UserId_FK_Index" ON "ForumQuestion" USING btree ("UserId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Note_UserId_FK_Index" ON "Note" USING btree ("UserId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Note_FileId_FK_Index" ON "Note" USING btree ("FileId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Notification_RecipientId_FK_Index" ON "Notification" USING btree ("RecipientId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Notification_SenderId_FK_Index" ON "Notification" USING btree ("SenderId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Notification_ResourceId_FK_Index" ON "Notification" USING btree ("ResourceId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Notification_TypeIdentifier_FK_Index" ON "Notification" USING btree ("Type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Ping_UserId_FK_Index" ON "Ping" USING btree ("UserId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ReferralBalance_UserId_FK_Index" ON "ReferralBalance" USING btree ("UserId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ReferralCode_UserId_FK_Index" ON "ReferralCode" USING btree ("UserId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Referral_UserId_FK_Index" ON "Referral" USING btree ("ReferredUserId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Referral_ReferringUserId_FK_Index" ON "Referral" USING btree ("ReferringUserId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Streak_UserId_FK_Index" ON "Streak" USING btree ("UserId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "StreakActivity_UserId_FK_Index" ON "StreakActivities" USING btree ("UserId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "UploadFolder_UserId_FK_Index" ON "UploadFolder" USING btree ("UserId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "UploadedFile_UserId_FK_Index" ON "UploadedFile" USING btree ("UserId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "UploadedFile_FolderId_FK_Index" ON "UploadedFile" USING btree ("FolderId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "User_to_Badge_UserId_FK_Index" ON "User_to_Badge" USING btree ("UserId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "User_to_Badge_BadgeId_FK_Index" ON "User_to_Badge" USING btree ("BadgeId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "User_to_Role_UserId_FK_Index" ON "User_to_Role" USING btree ("UserId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "User_to_Role_RoleId_FK_Index" ON "User_to_Role" USING btree ("RoleId");