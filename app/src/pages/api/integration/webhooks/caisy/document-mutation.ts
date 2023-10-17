/* eslint-disable @typescript-eslint/naming-convention */
import { env } from "@/env.mjs";
import { caisySDK } from "@/services/graphql/getSdk";

import { type NextApiHandler } from "next";

type CaisyWebhookRequest = {
  event_id: string;
  metadata: {
    blueprint_field_id: string;
    blueprint_id: string;
    document_id: string;
    document_locale_id: string;
  };
  scope: {
    project_id: string;
  };
  webhook: {
    trigger: string;
    webhook_id: string;
  };
};

const handler: NextApiHandler = async (req, res): Promise<void> =>
{
  console.log("----- Caisy Webhook received for document mutation -----");

  if(req.headers["x-auth"] !== env.CAISY_WEBHOOKS_SECRET_KEY)
  {
    console.log("Unauthorized request");
    return res.status(401).json({ message: "Unauthorized" });
  }

  if(req.method !== "POST")
  {
    console.log("Invalid request method");
    return res.status(400).json({ message: "Invalid request method" });
  }

  const webhook: CaisyWebhookRequest = req.body;

  switch (webhook.metadata.blueprint_id)
  {
    case env.CAISY_CASE_BLUEPRINT_ID:
    {
      const legalCase = await caisySDK.getCaseById({ id: webhook.metadata.document_id });
      console.log("case updated", legalCase.Case?.title);
      break;
    }
    case env.CAISY_ARTICLE_BLUEPRINT_ID:
    {
      const article = await caisySDK.getArticleById({ id: webhook.metadata.document_id });
      console.log("article updated", article.Article?.title);
      break;
    }
    default:
    {
      return res.status(200).json({ message: `blueprint_id ${webhook.metadata.blueprint_id} has no corresponding search index` });
    }
  }

  return res.status(200).json({ message: "Success" });
};

export default handler;
