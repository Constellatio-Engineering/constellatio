/* eslint-disable @typescript-eslint/naming-convention */
import { db } from "@/db/connection";
import { searchIndexUpdateQueue } from "@/db/schema";
import { env } from "@/env.mjs";
import { caisySDK } from "@/services/graphql/getSdk";

import { type NextApiHandler } from "next";
import { z, ZodError } from "zod";

/* type CaisyWebhookRequest = {
  event_id?: string;
  metadata?: {
    blueprint_field_id?: string;
    blueprint_id?: string;
    document_id?: string;
    document_locale_id?: string;
  };
  scope?: {
    project_id?: string;
  };
  webhook?: {
    trigger?: string;
    webhook_id?: string;
  };
};*/

const caisyWebhookSchema = z.object({
  metadata: z.object({
    blueprint_id: z.string(),
    document_id: z.string(),
  }),
  scope: z.object({
    project_id: z.string(),
  }),
});

type CaisyWebhook = z.infer<typeof caisyWebhookSchema>;

const handler: NextApiHandler = async (req, res): Promise<void> =>
{
  console.log(`----- ${(new Date()).toLocaleTimeString("de")} Caisy Webhook received for document mutation -----`);

  if(req.headers["x-auth"] !== env.CAISY_WEBHOOKS_SECRET_KEY)
  {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if(req.method !== "POST")
  {
    return res.status(400).json({ message: "Invalid request method" });
  }

  let webhook: CaisyWebhook;

  try
  {
    webhook = await caisyWebhookSchema.parseAsync(req.body);
  }
  catch (e: unknown)
  {
    if(e instanceof ZodError)
    {
      console.error("Caisy Webhook did not match expected schema. Search index will not be updated.", e.issues);
      return res.status(400).json({ issues: e.issues, message: "Invalid request body" });
    }
    else
    {
      console.error("Something went wrong while parsing the Caisy Webhook request body. Search index will not be updated.", e);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  if(webhook.scope.project_id !== env.CAISY_PROJECT_ID)
  {
    console.log("Invalid project id");
    return res.status(400).json({ message: "Invalid project id" });
  }

  const { document_id: documentId } = webhook.metadata;

  switch (webhook.metadata.blueprint_id)
  {
    case env.CAISY_CASE_BLUEPRINT_ID:
    {
      // const { Case } = await caisySDK.getCaseById({ id: documentId });
      await db.insert(searchIndexUpdateQueue).values({ cmsId: documentId, resourceType: "case" }).onConflictDoNothing();
      break;
    }
    case env.CAISY_ARTICLE_BLUEPRINT_ID:
    {
      // const { Article } = await caisySDK.getArticleById({ id: documentId });
      await db.insert(searchIndexUpdateQueue).values({ cmsId: documentId, resourceType: "article" }).onConflictDoNothing();
      break;
    }
    default:
    {
      console.log("unknown blueprint_id");
      console.log(webhook);
      return res.status(200).json({ message: `blueprint_id ${webhook.metadata.blueprint_id} has no corresponding search index` });
    }
  }

  return res.status(200).json({ message: "Success" });
};

export default handler;
