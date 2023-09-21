import { env } from "@/env.mjs";
 
import { MeiliSearch } from "meilisearch";

export const meiliSearchAdmin = new MeiliSearch({
  apiKey: env.MEILISEARCH_MASTER_API_KEY,
  host: env.MEILISEARCH_HOST_URL
});
