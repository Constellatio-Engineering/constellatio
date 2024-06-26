/* eslint-disable max-lines */
import { db } from "@/db/connection";
import { type CaisyWebhookEventType, documentsToTags, uploadedFilesToTags } from "@/db/schema";
import { env } from "@/env.mjs";
import { addArticlesAndCasesToSearchQueue, addContentToSearchQueue } from "@/server/api/services/search.services";
import { caisySDK } from "@/services/graphql/getSdk";

import { eq } from "drizzle-orm";
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

  let eventType: CaisyWebhookEventType;

  switch (webhookRequestBody.webhook.trigger)
  {
    case "document_update":
    {
      eventType = "upsert";
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
      await addContentToSearchQueue({ cmsId: documentId, eventType, searchIndexType: "cases" });
      break;
    }
    case env.CAISY_ARTICLE_BLUEPRINT_ID:
    {
      console.log(`Article '${documentId}' changed. Adding it to the search index update queue...`);
      await addContentToSearchQueue({ cmsId: documentId, eventType, searchIndexType: "articles" });
      break;
    }
    case env.CAISY_TAG_BLUEPRINT_ID:
    {
      const { Tags: Tag } = await caisySDK.getTagsById({ id: documentId });
      const tagName = Tag?.tagName;
      const tagId = documentId;

      if(!tagName)
      {
        console.warn("Tag has no name. Cannot update content with this tag.", Tag);
        return res.status(500).json({ message: `Tag ${documentId} has no name. Cannot update content with this tag.` });
      }

      console.log(`Tag '${tagName}' changed. Updating all content with this tag.`);

      const articlesWithTag = await caisySDK.getAllArticlesByTag({ tagName });
      const casesWithTag = await caisySDK.getAllCasesByTag({ tagName });
      const documentsWithTag = await db.query.documentsToTags.findMany({
        where: eq(documentsToTags.tagId, tagId)
      });
      const uploadsWithTag = await db.query.uploadedFilesToTags.findMany({
        where: eq(uploadedFilesToTags.tagId, tagId)
      });

      console.log(`Found ${articlesWithTag?.allArticle?.totalCount} articles with tag ${tagName}. Adding them to the search index update queue...`);
      console.log(`Found ${casesWithTag?.allCase?.totalCount} cases with tag ${tagName}. Adding them to the search index update queue...`);
      console.log(`Found ${documentsWithTag.length} documents with tag ${tagName}. Adding them to the search index update queue...`);
      console.log(`Found ${uploadsWithTag.length} uploads with tag ${tagName}. Adding them to the search index update queue...`);

      await addArticlesAndCasesToSearchQueue({ articles: articlesWithTag, cases: casesWithTag, eventType: "upsert" });
      await addContentToSearchQueue({ cmsId: documentId, eventType, searchIndexType: "tags" });
      await addContentToSearchQueue(documentsWithTag.map(({ documentId }) => ({
        cmsId: documentId,
        eventType: "upsert",
        searchIndexType: "user-documents"
      })));
      await addContentToSearchQueue(uploadsWithTag.map(({ fileId }) => ({
        cmsId: fileId,
        eventType: "upsert",
        searchIndexType: "user-uploads"
      })));

      break;
    }
    case env.CAISY_TOPIC_BLUEPRINT_ID:
    {
      const { Topic } = await caisySDK.getTopicById({ id: documentId });
      const topicName = Topic?.topicName;

      if(!topicName)
      {
        console.warn("Topic has no name. Cannot update content with this topic.", Topic);
        return res.status(500).json({ message: `Topic ${documentId} has no name. Cannot update content with this topic.` });
      }

      console.log(`Topic '${topicName}' changed. Updating all content with this topic.`);

      const articlesInTopic = await caisySDK.getAllArticlesByTopic({ topicName });
      const casesInTopic = await caisySDK.getAllCasesByTopic({ topicName });

      console.log(`Found ${articlesInTopic?.allArticle?.totalCount} articles in topic ${topicName}. Adding them to the search index update queue...`);
      console.log(`Found ${casesInTopic?.allCase?.totalCount} cases in topic ${topicName}. Adding them to the search index update queue...`);

      await addArticlesAndCasesToSearchQueue({ articles: articlesInTopic, cases: casesInTopic, eventType: "upsert" });

      break;
    }
    case env.CAISY_LEGAL_AREA_BLUEPRINT_ID:
    {
      const { LegalArea } = await caisySDK.getLegalAreaById({ id: documentId });
      const legalAreaName = LegalArea?.legalAreaName;

      if(!legalAreaName)
      {
        console.warn("Legal Area has no name. Cannot update content with this legal area.", LegalArea);
        return res.status(500).json({ message: `Legal Area ${documentId} has no name. Cannot update content with this legal area.` });
      }

      console.log(`Legal Area '${legalAreaName}' changed. Updating all content with this legal area.`);

      const articlesInLegalArea = await caisySDK.getAllArticlesByLegalArea({ legalAreaName });
      const casesInLegalArea = await caisySDK.getAllCasesByLegalArea({ legalAreaName });

      console.log(`Found ${articlesInLegalArea?.allArticle?.totalCount} articles in legal area ${legalAreaName}. Adding them to the search index update queue...`);
      console.log(`Found ${casesInLegalArea?.allCase?.totalCount} cases in legal area ${legalAreaName}. Adding them to the search index update queue...`);

      await addArticlesAndCasesToSearchQueue({ articles: articlesInLegalArea, cases: casesInLegalArea, eventType: "upsert" });

      break;
    }
    case env.CAISY_MAIN_CATEGORY_BLUEPRINT_ID:
    {
      const { MainCategory } = await caisySDK.getMainCategoryById({ id: documentId });
      const mainCategoryName = MainCategory?.mainCategory;

      if(!mainCategoryName)
      {
        console.warn("Main category has no name. Cannot update content with this main category.", MainCategory);
        return res.status(500).json({ message: `Main category ${documentId} has no name. Cannot update content with this main category.` });
      }

      console.log(`Main category '${mainCategoryName}' changed. Updating all content with this main category.`);

      const articlesInMainCategory = await caisySDK.getAllArticlesByMainCategory({ mainCategoryName });
      const casesInMainCategory = await caisySDK.getAllCasesByMainCategory({ mainCategoryName });

      console.log(`Found ${articlesInMainCategory?.allArticle?.totalCount} articles in main category ${mainCategoryName}. Adding them to the search index update queue...`);
      console.log(`Found ${casesInMainCategory?.allCase?.totalCount} cases in main category ${mainCategoryName}. Adding them to the search index update queue...`);

      await addArticlesAndCasesToSearchQueue({ articles: articlesInMainCategory, cases: casesInMainCategory, eventType: "upsert" });

      break;
    }
    case env.CAISY_SUB_CATEGORY_BLUEPRINT_ID:
    {
      // Sub categories are currently not linked to articles or cases so there is nothing to update
      break;
    }
    default:
    {
      console.log(`blueprint_id '${webhookRequestBody.metadata.blueprint_id}' has no corresponding search index`);
      return res.status(200).json({ message: `blueprint_id '${webhookRequestBody.metadata.blueprint_id}' has no corresponding search index` });
    }
  }

  return res.status(200).json({ message: "Success" });
};

export default handler;
