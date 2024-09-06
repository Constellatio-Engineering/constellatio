import { env } from "@/env.mjs";
import { type WebhookPayload } from "@/pages/api/integration/webhooks/supabase/types";

import { type NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) =>
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
    case "User":
      switch (payload.type)
      {
        case "INSERT":
          console.log("User inserted:", payload.record);
          break;
        case "UPDATE":
          console.log("User updated:", payload.old_record, payload.record);
          break;
        case "DELETE":
          console.log("User deleted:", payload.old_record);
          break;
      }
      break;
    case "ProfilePicture":
      switch (payload.type)
      {
        case "INSERT":
          console.log("ProfilePicture inserted:", payload.record);
          break;
        case "UPDATE":
          console.log("ProfilePicture updated:", payload.old_record, payload.record);
          break;
        case "DELETE":
          console.log("ProfilePicture deleted:", payload.old_record);
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
