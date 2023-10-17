import { db } from "@/db/connection";
import { gamesProgress } from "@/db/schema";
import { getGamesProgressSchema } from "@/schemas/gamesProgress/getGamesProgress.schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { caisySDK } from "@/services/graphql/getSdk";
import { getGamesFromCase } from "@/utils/case";

import { and, eq, inArray } from "drizzle-orm";

export const gamesProgressRouter = createTRPCRouter({
  getGamesProgress: protectedProcedure
    .input(getGamesProgressSchema)
    .query(async ({ ctx: { userId }, input: { caseId } }) =>
    {
      console.log("get games progress for caseId: ", caseId);

      const caseFromCms = await caisySDK.getCaseById({ id: caseId });
      const games = getGamesFromCase(caseFromCms.Case);

      const gameIds = games?.map(({ id }) => id).filter(Boolean);

      if(!gameIds || gameIds.length === 0)
      {
        console.log("no games found for caseId: ", caseId);
        return [];
      }

      // console.log("games: ", games);
      console.log("gameIds: ", gameIds);

      const _gamesProgress = await db.query.gamesProgress.findMany({
        where: and(
          inArray(gamesProgress.gameId, gameIds),
          eq(gamesProgress.userId, userId)
        )
      });

      console.log("_gamesProgress: ", _gamesProgress);

      return _gamesProgress;
    })
});
