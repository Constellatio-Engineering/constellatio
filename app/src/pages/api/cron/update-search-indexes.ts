/* eslint-disable max-lines,max-len */
import { db } from "@/db/connection";
import { allSearchIndexTypes, type SearchIndexType, searchIndexUpdateQueue } from "@/db/schema";
import { env } from "@/env.mjs";
import { meiliSearchAdmin } from "@/lib/meilisearch";
import { getArticleOverviewById } from "@/services/content/getArticleOverviewById";
import { getCaseOverviewById } from "@/services/content/getCaseOverviewById";
import { getLegalAreaById } from "@/services/content/getLegalAreaById";
import { getMainCategoryById } from "@/services/content/getMainCategoryById";
import { getSubCategoryById } from "@/services/content/getSubCategoryById";
import { getTagById } from "@/services/content/getTagById";
import { getTopicById } from "@/services/content/getTopicById";
import {
  type IGenArticle,
  type IGenCase,
  type IGenLegalArea,
  type IGenMainCategory,
  type IGenSubCategory,
  type IGenTags,
  type IGenTopic
} from "@/services/graphql/__generated/sdk";
import { type ArticleSearchIndexItem, createArticleSearchIndexItem } from "@/utils/search/caisy/article";
import { type CaseSearchIndexItem, createCaseSearchIndexItem } from "@/utils/search/caisy/case";
import { createLegalAreaSearchIndexItem, type LegalAreaSearchIndexItem } from "@/utils/search/caisy/legalArea";
import { createMainCategorySearchIndexItem, type MainCategorySearchIndexItem } from "@/utils/search/caisy/mainCategory";
import { createSubCategorySearchIndexItem, type SubCategorySearchIndexItem } from "@/utils/search/caisy/subCategory";
import { createTagSearchIndexItem, type TagSearchIndexItem } from "@/utils/search/caisy/tag";
import { createTopicSearchIndexItem, type TopicSearchIndexItem } from "@/utils/search/caisy/topic";

import { inArray } from "drizzle-orm";
import { type NextApiHandler } from "next";

type CaisyEntity = IGenArticle | IGenCase | IGenLegalArea | IGenMainCategory | IGenSubCategory | IGenTags | IGenTopic;
type SearchIndexItem = ArticleSearchIndexItem | CaseSearchIndexItem | LegalAreaSearchIndexItem | MainCategorySearchIndexItem | SubCategorySearchIndexItem | TagSearchIndexItem | TopicSearchIndexItem;

type EntityIdToSearchIndexItem<CaisyItemType, SearchIndexItemType> = {
  fetchItem: (params: { id: string }) => Promise<CaisyItemType | null>;
  id: string;
  itemToSearchIndexItem: (item: CaisyItemType) => SearchIndexItemType;
  searchIndexType: SearchIndexType;
};

const caisyEntityToSearchIndexItem = async <T extends CaisyEntity, U extends SearchIndexItem>({
  fetchItem,
  id,
  itemToSearchIndexItem,
  searchIndexType,
}: EntityIdToSearchIndexItem<T, U>): Promise<{ item: U; searchIndexType: SearchIndexType } | null> =>
{
  console.log("--- caisyEntityToSearchIndexItem ---", { id });

  const item = await fetchItem({ id });

  if(!item)
  {
    console.log(`Item with id ${id} not found`);
    return null;
  }

  console.log("Item found", item.__typename, item.id);

  const searchIndexItem = itemToSearchIndexItem(item);

  console.log("Search index item created", searchIndexItem);

  return {
    item: searchIndexItem,
    searchIndexType,
  };
};

const handler: NextApiHandler = async (req, res): Promise<void> =>
{
  if(req.headers.authorization !== `Bearer ${env.CRON_SECRET}`)
  {
    return res.status(401).json({ message: "Unauthorized" });
  }

  console.log("----- [Cronjob] Update Search Indexes -----");

  const itemsFromUpdateQueue = await db.select().from(searchIndexUpdateQueue);

  if(itemsFromUpdateQueue.length === 0)
  {
    console.log("No items in the search index update queue");
    return res.status(200).json({ message: "No items in the search index update queue" });
  }

  const updatedAndDeletedItemsIds = itemsFromUpdateQueue.map((item) => item.cmsId);
  const deletedItems = itemsFromUpdateQueue.filter((item) => item.eventType === "delete");

  // If an item is present in both the create/update and delete queue, it must be removed from the create/update queue
  const createdOrUpdatedItems = itemsFromUpdateQueue
    .filter((item) => item.eventType === "upsert")
    .filter((item) => !deletedItems.some((deletedItem) => deletedItem.cmsId === item.cmsId));

  const deleteItemsFromIndexTasksPromises = allSearchIndexTypes.map(async (searchIndex) =>
  {
    const deletedItemsForCurrentIndex = deletedItems.filter((item) => item.searchIndexType === searchIndex);

    if(deletedItemsForCurrentIndex.length === 0)
    {
      return null;
    }

    return meiliSearchAdmin.index(searchIndex).deleteDocuments(deletedItemsForCurrentIndex.map((item) => item.cmsId));
  });

  const deleteItemsFromIndexTasks = await Promise.all(deleteItemsFromIndexTasksPromises);
  const deleteItemsFromIndexTaskIds = deleteItemsFromIndexTasks.filter(Boolean).map((task) => task.taskUid);

  // TODO: Note for later: If a document cannot be found in caisy or the database, it should be removed from the search index

  const getSearchIndexItemsPromises = createdOrUpdatedItems.map(async (itemToUpdate) =>
  {
    const commonProps: Pick<EntityIdToSearchIndexItem<CaisyEntity, SearchIndexItem>, "id" | "searchIndexType"> = {
      id: itemToUpdate.cmsId,
      searchIndexType: itemToUpdate.searchIndexType,
    } as const;

    switch (itemToUpdate.searchIndexType)
    {
      case "articles":
      {
        return caisyEntityToSearchIndexItem({
          ...commonProps,
          fetchItem: getArticleOverviewById,
          itemToSearchIndexItem: createArticleSearchIndexItem,
        });
      }
      case "cases":
      {
        return caisyEntityToSearchIndexItem({
          ...commonProps,
          fetchItem: getCaseOverviewById,
          itemToSearchIndexItem: createCaseSearchIndexItem,
        });
      }
      case "forum-questions":
      {
        // TODO: Implement forum questions
        console.log("Forum questions are not supported yet");
        return null;
      }
      case "legal-areas":
      {
        return caisyEntityToSearchIndexItem({
          ...commonProps,
          fetchItem: getLegalAreaById,
          itemToSearchIndexItem: createLegalAreaSearchIndexItem,
        });
      }
      case "main-categories":
      {
        return caisyEntityToSearchIndexItem({
          ...commonProps,
          fetchItem: getMainCategoryById,
          itemToSearchIndexItem: createMainCategorySearchIndexItem,
        });
      }
      case "sub-categories":
      {
        return caisyEntityToSearchIndexItem({
          ...commonProps,
          fetchItem: getSubCategoryById,
          itemToSearchIndexItem: createSubCategorySearchIndexItem,
        });
      }
      case "tags":
      {
        return caisyEntityToSearchIndexItem({
          ...commonProps,
          fetchItem: getTagById,
          itemToSearchIndexItem: createTagSearchIndexItem
        });
      }
      case "topics":
      {
        return caisyEntityToSearchIndexItem({
          ...commonProps,
          fetchItem: getTopicById,
          itemToSearchIndexItem: createTopicSearchIndexItem
        });
      }
      case "user-documents":
      {
        // TODO: Implement user documents
        console.log("User documents are not supported yet");
        return null;
      }
      case "user-uploads":
      {
        // TODO: Implement user uploads
        console.log("User uploads are not supported yet");
        return null;
      }
    }
  });

  const searchIndexItems = (await Promise.all(getSearchIndexItemsPromises)).filter(Boolean);

  type GroupedItems = {
    [searchIndexType in SearchIndexType]?: SearchIndexItem[];
  };

  const groupedSearchIndexItems = searchIndexItems.reduce<GroupedItems>((acc, curr) =>
  {
    const { item, searchIndexType } = curr;

    if(!acc[searchIndexType])
    {
      acc[searchIndexType] = [];
    }

    acc[searchIndexType]!.push(item);

    return acc;
  }, {});

  const updateItemsInIndexTasksPromises = Object.entries(groupedSearchIndexItems).map(async ([searchIndexType, items]) =>
  {
    return meiliSearchAdmin.index(searchIndexType).addDocuments(items);
  });

  const updateItemsInIndexTasks = await Promise.all(updateItemsInIndexTasksPromises);
  const updateItemsInIndexTaskIds = updateItemsInIndexTasks.map((task) => task.taskUid);

  const indexTasks = await meiliSearchAdmin.waitForTasks([
    ...deleteItemsFromIndexTaskIds,
    ...updateItemsInIndexTaskIds,
  ].filter(Boolean), {
    intervalMs: 1000,
    timeOutMs: 1000 * 60 * 5,
  });

  const failedIndexTasks = indexTasks.filter((t) => t.status !== "succeeded");

  if(failedIndexTasks.length > 0)
  {
    console.error("Failed to create indices for " + failedIndexTasks.map((t) => `'${t.indexUid}'`).join(", "), failedIndexTasks);
    return res.status(500).json({ message: "Failed to create indices" });
  }

  await db.delete(searchIndexUpdateQueue).where(
    inArray(searchIndexUpdateQueue.cmsId, updatedAndDeletedItemsIds)
  );

  console.log("Search indexes updated successfully for cases and articles");

  return res.status(200).json({ message: "Search indexes updated" });
};

export default handler;
