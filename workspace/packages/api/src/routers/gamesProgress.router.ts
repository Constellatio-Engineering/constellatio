import { caisySDK } from "@constellatio/cms/sdk";
import { getGamesFromCase } from "@constellatio/cms/utils/case";
import { and, eq, inArray } from "@constellatio/db";
import { db } from "@constellatio/db/client";
import { type GameProgress, gamesProgress } from "@constellatio/db/schema";
import { getGamesProgressSchema } from "@constellatio/schemas/routers/gamesProgress/getGamesProgress.schema";
import { setGameProgressStateSchema } from "@constellatio/schemas/routers/gamesProgress/setGameProgressState.schema";
import { type inferProcedureOutput } from "@trpc/server";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const gamesProgressRouter = createTRPCRouter({
  getGamesProgress: protectedProcedure
    .input(getGamesProgressSchema)
    .query(async ({ ctx: { userId }, input }) =>
    {
      let gameIds: string[];

      if(input.queryType === "byGameIds")
      {
        gameIds = input.gamesIds;
      }
      else
      {
        const caseFromCms = await caisySDK.getCaseById({ id: input.caseId });
        const games = getGamesFromCase(caseFromCms.Case);
        gameIds = games?.map(({ id }) => id).filter(Boolean);
      }

      if(gameIds.length === 0)
      {
        return [];
      }

      const _gamesProgress = await db.query.gamesProgress.findMany({
        where: and(
          inArray(gamesProgress.gameId, gameIds),
          eq(gamesProgress.userId, userId)
        )
      });

      const resultArray: Array<{
        gameId: string;
        results: GameProgress[];
      }> = gameIds.map(gameId =>
      {
        const gameProgress = _gamesProgress.filter(({ gameId: _gameId, progressState }) =>
        {
          return _gameId === gameId && progressState === "completed";
        });

        if(gameProgress.length === 0)
        {
          return ({
            gameId,
            results: [{
              createdAt: new Date(),
              gameId,
              gameResult: null,
              id: 0,
              progressState: "not-started",
              updatedAt: new Date(),
              userId,
              wasSolvedCorrectly: null
            }]
          });
        }
        else
        {
          return ({
            gameId,
            results: gameProgress
          });
        }
      });

      return resultArray;
    }),
  /* resetGamesProgress: protectedProcedure
    .input(z.object({
      gameIds: idValidation.array()
    }))
    .mutation(async ({ ctx: { userId }, input: { gameIds } }) =>
    {
      await db
        .delete(gamesProgress)
        .where(
          and(
            inArray(gamesProgress.gameId, gameIds),
            eq(gamesProgress.userId, userId)
          )
        );
    }),*/
  setGameProgress: protectedProcedure
    .input(setGameProgressStateSchema)
    .mutation(async ({
      ctx: { userId },
      input: {
        gameId,
        gameResult,
        progressState,
        wasSolvedCorrectly
      } 
    }) =>
    {
      await db.insert(gamesProgress)
        .values({
          gameId,
          gameResult,
          progressState,
          userId,
          wasSolvedCorrectly,
        });
    })
});

export type GetGamesProgressResult = inferProcedureOutput<typeof gamesProgressRouter["getGamesProgress"]>;
