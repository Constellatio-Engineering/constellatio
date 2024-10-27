import { caisySDK } from "@acme/cms";
import { and, eq, inArray } from "@acme/db";
import { db } from "@acme/db/client";
import { GameProgress, gamesProgress } from "@acme/db/schema";
import { getGamesProgressSchema, setGameProgressStateSchema } from "@acme/schemas";
import { getGamesFromCase } from "@acme/utils";
import { createTRPCRouter, protectedProcedure } from "../trpc";

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
