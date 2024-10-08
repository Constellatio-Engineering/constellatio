import { db } from "@/db/connection";
import { type GameProgress, gamesProgress } from "@/db/schema";
import { getGamesProgressSchema } from "@/schemas/gamesProgress/getGamesProgress.schema";
import { setGameProgressStateSchema } from "@/schemas/gamesProgress/setGameProgressState.schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { caisySDK } from "@/services/graphql/getSdk";
import { getGamesFromCase } from "@/utils/case";

import { and, eq, inArray } from "drizzle-orm";

export const gamesProgressRouter = createTRPCRouter({
  getGamesProgress: protectedProcedure
    .input(getGamesProgressSchema)
    .query(async ({ ctx: { userId }, input: { caseId } }) =>
    {
      const caseFromCms = await caisySDK.getCaseById({ id: caseId });
      const games = getGamesFromCase(caseFromCms.Case);
      const gameIds = games?.map(({ id }) => id).filter(Boolean);

      if(!gameIds || gameIds.length === 0)
      {
        console.log("no games found for caseId: ", caseId);
        return [];
      }

      const _gamesProgress = await db.query.gamesProgress.findMany({
        where: and(
          inArray(gamesProgress.gameId, gameIds),
          eq(gamesProgress.userId, userId)
        )
      });

      const resultArray: GameProgress[] = gameIds.map(gameId =>
      {
        const gameProgress = _gamesProgress.find(({ gameId: _gameId }) => _gameId === gameId);

        if(!gameProgress)
        {
          return ({ 
            createdAt: new Date(),
            gameId,
            gameResult: null,
            id: 0,
            progressState: "not-started",
            updatedAt: new Date(),
            userId
          });
        }
        else
        {
          return gameProgress;
        }
      });

      return resultArray;
    }),
  setGameProgress: protectedProcedure
    .input(setGameProgressStateSchema)
    .mutation(async ({ ctx: { userId }, input: { gameId, gameResult, progressState } }) =>
    {
      await db.insert(gamesProgress)
        .values({
          gameId,
          gameResult,
          progressState,
          userId,
        })
        .onConflictDoUpdate({
          set: { gameResult },
          target: [gamesProgress.gameId, gamesProgress.userId],
        });
    })
});
