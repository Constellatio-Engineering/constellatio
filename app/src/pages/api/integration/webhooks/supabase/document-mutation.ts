import { type CaisyWebhookEventType, type SearchIndexType } from "@/db/schema";
import { env } from "@/env.mjs";
import { addContentToSearchQueue } from "@/server/api/services/search.services";

import { type NextApiHandler } from "next";
import { z, ZodError } from "zod";

const caisyWebhookSchema = z.object({
  metadata: z.object({
    blueprint_id: z.string(),
    document_id: z.string(),
  }),
  scope: z.object({
    project_id: z.string(),
  }),
  webhook: z.object({
    trigger: z.enum(["document_update", "document_delete"])
  }),
});

type CaisyWebhook = z.infer<typeof caisyWebhookSchema>;

const handler: NextApiHandler = async (req, res): Promise<void> =>
{
  console.log(`----- ${(new Date()).toLocaleTimeString("de")} Supabase Webhook received for document mutation -----`);

  console.log(req.body);

  return res.status(200).json({ message: "Success" });
};

export default handler;
