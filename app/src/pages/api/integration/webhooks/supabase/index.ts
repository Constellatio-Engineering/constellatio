import { env } from "@/env.mjs";
import { type WebhookPayload } from "@/pages/api/integration/webhooks/supabase/types";

import { type NextApiHandler } from "next";

import { streakHandlerForumAnswerInsert, streakHandlerForumQuestionInsert, streakHandlerPingInsert } from "./handlers/streak.handler";

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
    case "User":
      switch (payload.type)
      {
        case "INSERT":
          // TODO: Implement user insert webhook
          console.log("User inserted:", payload.record);
          break;
        case "UPDATE":
          // TODO: Implement user update webhook
          console.log("User updated:", payload.old_record, payload.record);
          break;
        case "DELETE":
          // TODO: Implement user delete webhook
          console.log("User deleted:", payload.old_record);
          break;
      }
      break;
    case "ProfilePicture":
      switch (payload.type)
      {
        case "INSERT":
          // TODO: Implement profile picture insert webhook
          console.log("ProfilePicture inserted:", payload.record);
          break;
        case "UPDATE":
          // TODO: Implement profile picture update webhook
          console.log("ProfilePicture updated:", payload.old_record, payload.record);
          break;
        case "DELETE":
          // TODO: Implement profile picture delete webhook
          console.log("ProfilePicture deleted:", payload.old_record);
          break;
      }
      break;
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
          console.log("CaseProgress inserted:", payload.record);
          break;
        case "UPDATE":
          console.log("CaseProgress updated:", payload.old_record, payload.record);
          break;
      }
      break;
    default:
      console.error("Unknown table type in payload:", payload);
      return res.status(500).json({ message: "Unknown table type" });
  }

  return res.status(200).json({ message: "Success" });
};

export default handler;
