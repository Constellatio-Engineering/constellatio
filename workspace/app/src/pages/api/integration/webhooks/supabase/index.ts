import {
  articleProgressHandlerContentViewInsert
} from "@/pages/api/integration/webhooks/supabase/handlers/articleProgress.handler";
import { bookmarkHandlerBookmarkInsert } from "@/pages/api/integration/webhooks/supabase/handlers/bookmark.handler";
import {
  caseProgressHandler
} from "@/pages/api/integration/webhooks/supabase/handlers/caseProgress.handler";
import {
  forumActivityHandlerAnswerInsert, forumActivityHandlerQuestionInsert
} from "@/pages/api/integration/webhooks/supabase/handlers/forumActivity.handler";
import {
  forumAnswerActivityHandlerCorrectAnswerInsert
} from "@/pages/api/integration/webhooks/supabase/handlers/forumAnswerActivity.handler";
import {
  gameProgressHandlerGameProgressInsert
} from "@/pages/api/integration/webhooks/supabase/handlers/gameProgress.handler";
import {
  isOneOfTheFirstUsersHandlerUserInsert
} from "@/pages/api/integration/webhooks/supabase/handlers/isOneOfTheFirstUsers.handler";
import {
  ugcHandlerDocumentInsert,
  ugcHandlerUploadedFileInsert
} from "@/pages/api/integration/webhooks/supabase/handlers/ugc.handler";
import { usageTimeHandlerPingInsert } from "@/pages/api/integration/webhooks/supabase/handlers/usageTime.handler";
import { type WebhookPayload } from "@/pages/api/integration/webhooks/supabase/types";

import { env } from "@constellatio/env";
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
  console.log("Supabase Webhook received:", payload);

  switch (payload.table)
  {
    case "Ping":
      switch (payload.type)
      {
        case "INSERT":
          await streakHandlerPingInsert(payload.record);
          await usageTimeHandlerPingInsert(payload.record);
          break;
      }
      break;
    case "ForumAnswer":
      switch (payload.type)
      {
        case "INSERT":
          await streakHandlerForumAnswerInsert(payload.record);
          await forumActivityHandlerAnswerInsert(payload.record);
          break;
      }
      break;
    case "ForumQuestion":
      switch (payload.type)
      {
        case "INSERT":
          await streakHandlerForumQuestionInsert(payload.record);
          await forumActivityHandlerQuestionInsert(payload.record);
          break;
      }
      break;
    case "CorrectAnswer":
      switch (payload.type)
      {
        case "INSERT":
          await forumAnswerActivityHandlerCorrectAnswerInsert(payload.record);
          break;
      }
      break;
    case "CaseProgress":
      switch (payload.type)
      {
        case "INSERT":
          await streakHandlerCaseProgressInsert(payload.record);
          await caseProgressHandler(payload.record);
          break;
        case "UPDATE":
          await streakHandlerCaseProgressUpdate(payload.record);
          await caseProgressHandler(payload.record);
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
        case "UPDATE":
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
      switch (payload.type)
      {
        case "INSERT":
          await isOneOfTheFirstUsersHandlerUserInsert(payload.record);
          break;
      }
      break;
    }
    case "ContentView": {
      switch (payload.type)
      {
        case "INSERT":
          await articleProgressHandlerContentViewInsert(payload.record);
          break;
      }
      break;
    }
    case "ProfilePicture":
    {
      throw new Error("Case 'ProfilePicture' is not implemented yet");
    }
  }

  return res.status(200).json({ message: "Success" });
};

export default handler;
