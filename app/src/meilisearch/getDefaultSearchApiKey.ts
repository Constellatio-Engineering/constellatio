import { meiliSearchAdmin } from "@/meilisearch/client";

import { type Key } from "meilisearch";

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
