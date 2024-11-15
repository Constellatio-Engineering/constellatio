import { caisySDK } from "@constellatio/cms/sdk";
import { getGamesFromCase } from "@constellatio/cms/utils/case";
import { and, eq, inArray, type SQLWrapper } from "@constellatio/db";
import { db } from "@constellatio/db/client";
import { type CaseProgress, casesProgress, casesSolutions, gamesProgress } from "@constellatio/db/schema";
import { getCaseProgressSchema } from "@constellatio/schemas/routers/caseProgress/getCaseProgress.schema";
import { getCasesProgressSchema } from "@constellatio/schemas/routers/caseProgress/getCasesProgress.schema";
import { getSubmittedCaseSolutionSchema } from "@constellatio/schemas/routers/caseProgress/getSubmittedCaseSolution.schema";
import { resetCaseProgressSchema } from "@constellatio/schemas/routers/caseProgress/resetCaseProgress.schema";
import { setCaseProgressStateSchema } from "@constellatio/schemas/routers/caseProgress/setCaseProgressState.schema";
import { submitCaseSolutionSchema } from "@constellatio/schemas/routers/caseProgress/submitCaseSolution.schema";

import { addUserToCrmUpdateQueue } from "../lib/clickup/utils";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export type GetCaseProgressResult = Pick<CaseProgress, "progressState" | "caseId">;
type GetCasesProgressResult = GetCaseProgressResult[];

export const caseProgressRouter = createTRPCRouter({
  getCaseProgress: protectedProcedure
    .input(getCaseProgressSchema)
    .query(async ({ ctx: { userId }, input: { caseId } }) =>
    {
      const caseProgress = await db.query.casesProgress.findFirst({
        where: and(
          eq(casesProgress.userId, userId),
          eq(casesProgress.caseId, caseId),
        ),
      });

      let getCaseProgressResult: GetCaseProgressResult;

      if(!caseProgress)
      {
        getCaseProgressResult = {
          caseId,
          progressState: "not-started"
        };
      }
      else
      {
        getCaseProgressResult = {
          caseId,
          progressState: caseProgress.progressState
        };
      }

      return getCaseProgressResult;
    }),
  getCasesProgress: protectedProcedure
    .input(getCasesProgressSchema)
    .query(async ({ ctx: { userId }, input }) =>
    {
      const queryConditions: SQLWrapper[] = [eq(casesProgress.userId, userId)];
      const caseIds = input?.caseIds;

      if(caseIds)
      {
        queryConditions.push(inArray(casesProgress.caseId, caseIds));
      }

      const casesProgressQueryResult = await db.query.casesProgress.findMany({
        where: and(...queryConditions),
      });

      const filteredResult: GetCasesProgressResult = casesProgressQueryResult.map(({ caseId, progressState }) => ({
        caseId,
        progressState
      }));

      return filteredResult;
    }),
  getSubmittedSolution: protectedProcedure
    .input(getSubmittedCaseSolutionSchema)
    .query(async ({ ctx: { userId }, input: { caseId } }) =>
    {
      const submittedCaseSolution = await db.query.casesSolutions.findFirst({
        where: and(
          eq(casesProgress.userId, userId),
          eq(casesProgress.caseId, caseId),
        ),
      });

      return submittedCaseSolution ?? null;
    }),
  resetProgress: protectedProcedure
    .input(resetCaseProgressSchema)
    .mutation(async ({ ctx: { userId }, input: { caseId } }) =>
    {
      const caseFromCms = await caisySDK.getCaseById({ id: caseId });
      const games = getGamesFromCase(caseFromCms.Case);
      const gameIds = games?.map(({ id }) => id).filter(Boolean);

      if(gameIds.length > 0)
      {
        await db.delete(gamesProgress).where(
          and(
            eq(gamesProgress.userId, userId),
            inArray(gamesProgress.gameId, gameIds),
          )
        );
      }

      await db.delete(casesSolutions).where(
        and(
          eq(casesSolutions.userId, userId),
          eq(casesSolutions.caseId, caseId),
        )
      );

      await db.delete(casesProgress).where(
        and(
          eq(casesProgress.userId, userId),
          eq(casesProgress.caseId, caseId),
        )
      );

      await addUserToCrmUpdateQueue(userId);

      return caseId;
    }),
  setProgressState: protectedProcedure
    .input(setCaseProgressStateSchema)
    .mutation(async ({ ctx: { userId }, input: { caseId, progressState } }) =>
    {
      await db
        .insert(casesProgress)
        .values({ caseId, progressState, userId })
        .onConflictDoUpdate({
          set: { progressState },
          target: [casesProgress.caseId, casesProgress.userId],
        });

      if(progressState === "completed")
      {
        await addUserToCrmUpdateQueue(userId);
      }
    }),
  submitSolution: protectedProcedure
    .input(submitCaseSolutionSchema)
    .mutation(async ({ ctx: { userId }, input: { caseId, solution } }) =>
    {
      const existingCaseSolution = await db.query.casesSolutions.findFirst({
        where: and(
          eq(casesProgress.userId, userId),
          eq(casesProgress.caseId, caseId),
        ),
      });

      if(existingCaseSolution)
      {
        await db.update(casesSolutions).set({ solution }).where(
          and(
            eq(casesSolutions.userId, userId),
            eq(casesSolutions.caseId, caseId),
          )
        );
        return;
      }

      await db.insert(casesSolutions).values({
        caseId,
        solution,
        userId,
      });
    })
});
