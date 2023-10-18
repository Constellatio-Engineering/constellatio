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

      const resultArray: GameProgress[] = gameIds.map(gameId =>
      {
        const gameProgress = _gamesProgress.find(({ gameId: _gameId }) => _gameId === gameId);

        if(!gameProgress)
        {
          return ({
            gameId,
            progressState: "not-started",
            userId
          });
        }
        else
        {
          return gameProgress;
        }
      });

      console.log("gamesProgress: ", resultArray);

      return resultArray;
    }),
  setGameProgress: protectedProcedure
    .input(setGameProgressStateSchema)
    .mutation(async ({ ctx: { userId }, input: { gameId, progressState } }) =>
    {
      const existingGameProgress = await db.query.gamesProgress.findFirst({
        where: and(
          eq(gamesProgress.userId, userId),
          eq(gamesProgress.gameId, gameId)
        )
      });

      if(existingGameProgress)
      {
        console.log("gameProgress exists, updating...");
        await db.update(gamesProgress).set({ progressState }).where(
          and(
            eq(gamesProgress.userId, userId),
            eq(gamesProgress.gameId, gameId)
          )
        );
        return;
      }
      else
      {
        console.log("gameProgress does not exist, inserting...");
        await db.insert(gamesProgress).values({
          gameId,
          progressState,
          userId,
        });
        return;
      }
    })
});
