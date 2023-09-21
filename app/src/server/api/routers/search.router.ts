import { env } from "@/env.mjs";
import { meiliSearchAdmin } from "@/meilisearch/client";
import { getDefaultSearchApiKey } from "@/meilisearch/getDefaultSearchApiKey";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { type SearchIndex } from "@/utils/search";

type SearchRules = {
  [key in SearchIndex]: {
    filter: string | undefined;
  }
};

export const searchRouter = createTRPCRouter({
  getTenantToken: protectedProcedure
    .query(async ({ ctx: { userId } }) =>
    {
      const searchRules: SearchRules = {
        cases: {
          filter: undefined,
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
