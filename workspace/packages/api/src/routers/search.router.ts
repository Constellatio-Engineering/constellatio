import { getPopularSearches } from "@constellatio/cms/content/getPopularSearches";
import { type SearchIndex } from "@constellatio/db-to-search";
import { env } from "@constellatio/env";

import { getDefaultSearchApiKey, meiliSearchAdmin } from "../lib/meilisearch";
import { createTRPCRouter, protectedProcedure } from "../trpc";

type SearchRules = {
  [key in SearchIndex]: {
    filter: string | undefined;
  }
};

export const searchRouter = createTRPCRouter({
  getPopularSearch: protectedProcedure
    .query(async () =>
    {
      const popularSearchRes = await getPopularSearches();
      return popularSearchRes;
    }),
  getTenantToken: protectedProcedure
    .query(async ({ ctx: { userId } }) =>
    {
      const searchRules: SearchRules = {
        articles: {
          filter: undefined,
        },
        cases: {
          filter: undefined,
        },
        "forum-questions": {
          filter: undefined,
        },
        tags: {
          filter: undefined,
        },
        "user-documents": {
          filter: `userId = ${userId}`,
        },
        "user-uploads": {
          filter: `userId = ${userId}`,
        }
      };

      const expiresAt = new Date(Date.now() + env.NEXT_PUBLIC_MEILISEARCH_TENANT_TOKEN_EXPIRATION_TIME_MS);
      const defaultSearchApiKey = await getDefaultSearchApiKey();

      const token = meiliSearchAdmin.generateTenantToken(defaultSearchApiKey.uid, searchRules, {
        apiKey: defaultSearchApiKey.key,
        expiresAt,
      });

      return token;
    }),
});
