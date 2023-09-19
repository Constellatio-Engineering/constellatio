import { env } from "@/env.mjs";
import getAllCases from "@/services/content/getAllCases";
import { getCaseById } from "@/services/content/getCaseById";
import { createCaseSearchIndexItem, searchIndices } from "@/utils/search";

import { MeiliSearch } from "meilisearch";
import { type NextApiHandler } from "next";

const meiliSearch = new MeiliSearch({
  apiKey: env.MEILISEARCH_MASTER_API_KEY,
  host: env.MEILISEARCH_HOST_URL
});

const handler: NextApiHandler = async (req, res) =>
{
  if(env.NEXT_PUBLIC_NODE_ENV !== "development")
  {
    return res.status(403).json({ details: "This endpoint is only available in development mode", message: "Forbidden" });
  }

  if(req.method !== "POST")
  {
    return res.status(400).json({ message: "Invalid request method" });
  }

  console.log("Creating meilisearch index for cases. This may take a while...");

  await meiliSearch.deleteIndexIfExists(searchIndices.cases);

  const allCases = await getAllCases();

  const fetchAllCasesDetailsPromises = allCases.map(async (c) =>
  {
    const { Case } = await getCaseById({ id: c.id! });
    return Case;
  });

  const allCasesWithDetails = await Promise.all(fetchAllCasesDetailsPromises);
  const allCasesSearchIndexItems = allCasesWithDetails.filter(Boolean).map(createCaseSearchIndexItem);
  const createCasesIndexTask = await meiliSearch.index(searchIndices.cases).addDocuments(allCasesSearchIndexItems);
  const createCasesIndexResult = await meiliSearch.waitForTask(createCasesIndexTask.taskUid, {
    intervalMs: 1000,
    timeOutMs: 1000 * 60 * 5,
  });

  if(createCasesIndexResult.status !== "succeeded")
  {
    console.log("Failed to create cases index:", createCasesIndexResult);
    return res.status(500).json({ message: "Failed to create cases index" });
  }

  console.log("Successfully created cases index");
  return res.status(200).json({ message: "Success" });
};

export default handler;
