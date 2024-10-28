import { env } from "@constellatio/env";
import { type Key, MeiliSearch } from "meilisearch";

export const meiliSearchAdmin = new MeiliSearch({
  apiKey: env.MEILISEARCH_MASTER_API_KEY,
  host: env.MEILISEARCH_HOST_URL
});

export const getDefaultSearchApiKey = async (): Promise<Key> =>
{
  const keys = await meiliSearchAdmin.getKeys();
  const defaultSearchApiKey = keys.results.find(key => key.name === "Default Search API Key");

  if(!defaultSearchApiKey)
  {
    throw new Error("No default search API key found");
  }

  return defaultSearchApiKey;
};
