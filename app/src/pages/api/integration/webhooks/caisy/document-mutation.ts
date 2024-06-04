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
    trigger: z.enum(["document_create", "document_update", "document_delete"])
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

  let webhookRequestBody: CaisyWebhook;

  try
  {
    webhookRequestBody = await caisyWebhookSchema.parseAsync(req.body);
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

  if(webhookRequestBody.scope.project_id !== env.CAISY_PROJECT_ID)
  {
    console.log("Invalid project id");
    return res.status(400).json({ message: "Invalid project id" });
  }

  console.log("Caisy Webhook received:", webhookRequestBody);

  const { document_id: documentId } = webhookRequestBody.metadata;

  let resourceType: SearchIndexType;
  let eventType: CaisyWebhookEventType;

  switch (webhookRequestBody.webhook.trigger)
  {
    case "document_create":
    {
      eventType = "create";
      break;
    }
    case "document_update":
    {
      eventType = "update";
      break;
    }
    case "document_delete":
    {
      eventType = "delete";
      break;
    }
    default:
    {
      console.log(`Invalid webhook trigger '${webhookRequestBody.webhook.trigger}'`);
      return res.status(400).json({ message: `Invalid webhook trigger '${webhookRequestBody.webhook.trigger}'` });
    }
  }

  switch (webhookRequestBody.metadata.blueprint_id)
  {
    case env.CAISY_CASE_BLUEPRINT_ID:
    {
      console.log(`Case '${documentId}' changed. Adding it to the search index update queue...`);
      resourceType = "case";
      break;
    }
    case env.CAISY_ARTICLE_BLUEPRINT_ID:
    {
      console.log(`Article '${documentId}' changed. Adding it to the search index update queue...`);
      resourceType = "article";
      break;
    }
    case env.CAISY_TAG_BLUEPRINT_ID:
    {
      console.log(`Tag '${documentId}' changed. Updating all content with this tag.`);
      resourceType = "tag";
      break;
    }
    case env.CAISY_TOPIC_BLUEPRINT_ID:
    {
      console.log(`Topic '${documentId}' changed. Updating all content with this topic.`);
      resourceType = "topic";
      break;
    }
    case env.CAISY_LEGAL_AREA_BLUEPRINT_ID:
    {
      console.log(`Legal area '${documentId}' changed. Updating all content with this legal area.`);
      resourceType = "legalArea";
      break;
    }
    case env.CAISY_MAIN_CATEGORY_BLUEPRINT_ID:
    {
      console.log(`Main category '${documentId}' changed. Updating all content with this main category.`);
      resourceType = "mainCategory";
      break;
    }
    case env.CAISY_SUB_CATEGORY_BLUEPRINT_ID:
    {
      console.log(`Sub category '${documentId}' changed. Updating all content with this sub category.`);
      resourceType = "subCategory";
      break;
    }
    default:
    {
      console.log(`blueprint_id '${webhookRequestBody.metadata.blueprint_id}' has no corresponding search index`);
      return res.status(200).json({ message: `blueprint_id '${webhookRequestBody.metadata.blueprint_id}' has no corresponding search index` });
    }
  }

  await addContentToSearchQueue({
    cmsId: documentId,
    eventType,
    resourceType 
  });

  return res.status(200).json({ message: "Success" });
};

export default handler;
