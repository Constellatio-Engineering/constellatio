import { env } from "@/env.mjs";

import { MeiliSearch } from "meilisearch";
import { type NextApiHandler } from "next";

const movies = require("./movies.json");

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

  console.log("Creating meilisearch index for movies. This may take a while...");

  await meiliSearch.deleteIndexIfExists("movies");
  const createMoviesIndexTask = await meiliSearch.index("movies").addDocuments(movies);

  const createMoviesIndexResult = await meiliSearch.waitForTask(createMoviesIndexTask.taskUid, {
    intervalMs: 1000,
    timeOutMs: 1000 * 60 * 5,
  });

  if(createMoviesIndexResult.status !== "succeeded")
  {
    console.log("Failed to create movies index:", createMoviesIndexResult);
    return res.status(500).json({ message: "Failed to create movies index" });
  }

  console.log("Successfully created movies index");
  return res.status(200).json({ message: "Success" });
};

export default handler;
