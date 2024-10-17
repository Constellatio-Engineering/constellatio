import { env } from "@/env.mjs";
import { bookmarkHandlerBookmarkInsert } from "@/pages/api/integration/webhooks/supabase/handlers/bookmark.handler";
import {
  gameProgressHandlerGameProgressInsert
} from "@/pages/api/integration/webhooks/supabase/handlers/gameProgress.handler";
import {
  ugcHandlerDocumentInsert,
  ugcHandlerUploadedFileInsert
} from "@/pages/api/integration/webhooks/supabase/handlers/ugc.handler";
import { type WebhookPayload } from "@/pages/api/integration/webhooks/supabase/types";

import { type NextApiHandler } from "next";

import {
  streakHandlerCaseProgressInsert,
  streakHandlerCaseProgressUpdate,
  streakHandlerForumAnswerInsert,
  streakHandlerForumQuestionInsert,
  streakHandlerPingInsert,
  streakHandlerStreakInsert,
  streakHandlerStreakUpdate
} from "./handlers/streak.handler";

const handler: NextApiHandler = async (req, res) =>
{
  if(req.headers.authorization !== `Bearer ${env.SUPABASE_WEBHOOK_SECRET}`)
  {
    console.error("Invalid supabase webhook secret");
    return res.status(401).json({ message: "Unauthorized" });
  }

  const payload = req.body as WebhookPayload;
  // console.log("Supabase Webhook received:", payload);

  switch (payload.table)
  {
    case "Ping":
      switch (payload.type)
      {
        case "INSERT":
          await streakHandlerPingInsert(payload.record);
          break;
      }
      break;
    case "ForumAnswer":
      switch (payload.type)
      {
        case "INSERT":
          await streakHandlerForumAnswerInsert(payload.record);
          break;
      }
      break;
    case "ForumQuestion":
      switch (payload.type)
      {
        case "INSERT":
          await streakHandlerForumQuestionInsert(payload.record);
          break;
      }
      break;
    case "CaseProgress":
      switch (payload.type)
      {
        case "INSERT":
          await streakHandlerCaseProgressInsert(payload.record);
          break;
        case "UPDATE":
          await streakHandlerCaseProgressUpdate(payload.record);
          break;
      }
      break;
    case "Streak":
      switch (payload.type)
      {
        case "INSERT":
          await streakHandlerStreakInsert(payload.record);
          break;
        case "UPDATE":
          await streakHandlerStreakUpdate(payload.record);
          break;
      }
      break;
    case "Bookmark":
    {
      switch (payload.type)
      {
        case "INSERT":
          await bookmarkHandlerBookmarkInsert(payload.record);
          break;
      }
      break;
    }
    case "GameProgress":
    {
      switch (payload.type)
      {
        case "INSERT":
          await gameProgressHandlerGameProgressInsert(payload.record);
          break;
      }
      break;
    }
    case "Document":
    {
      switch (payload.type)
      {
        case "INSERT":
          await ugcHandlerDocumentInsert(payload.record);
          break;
      }
      break;
    }
    case "UploadedFile":
    {
      switch (payload.type)
      {
        case "INSERT":
          await ugcHandlerUploadedFileInsert(payload.record);
          break;
      }
      break;
    }
    case "User":
    {
      throw new Error("Case 'User' is not implemented yet");
    }
    case "ProfilePicture":
    {
      throw new Error("Case 'ProfilePicture' is not implemented yet");
    }
  }

  return res.status(200).json({ message: "Success" });
};

export default handler;
