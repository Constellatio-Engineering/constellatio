import { db } from "@/db/connection";
import { type CaseProgress, casesProgress } from "@/db/schema";
import { getCaseProgressSchema } from "@/schemas/caseProgress/getCaseProgress.schema";
import { getCasesProgressSchema } from "@/schemas/caseProgress/getCasesProgress.schema";
import { resetCaseProgressSchema } from "@/schemas/caseProgress/resetCaseProgress.schema";
import { setCaseProgressStateSchema } from "@/schemas/caseProgress/setCaseProgressState.schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import { and, eq, inArray, type SQLWrapper } from "drizzle-orm";

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
  resetProgress: protectedProcedure
    .input(resetCaseProgressSchema)
    .mutation(async ({ ctx: { userId }, input: { caseId } }) =>
    {
      await db.delete(casesProgress).where(
        and(
          eq(casesProgress.userId, userId),
          eq(casesProgress.caseId, caseId),
        )
      );

      /*
       * TODO - reset all games progress
       */
    }),
  setProgressState: protectedProcedure
    .input(setCaseProgressStateSchema)
    .mutation(async ({ ctx: { userId }, input: { caseId, progressState } }) =>
    {
      const existingCaseProgress = await db.query.casesProgress.findFirst({
        where: and(
          eq(casesProgress.userId, userId),
          eq(casesProgress.caseId, caseId),
        ),
      });

      if(existingCaseProgress)
      {
        console.log("caseProgress exists, updating...");

        await db.update(casesProgress).set({ progressState }).where(
          and(
            eq(casesProgress.userId, userId),
            eq(casesProgress.caseId, caseId),
          )
        );
        return;
      }

      console.log("caseProgress does not exist, inserting...");

      await db.insert(casesProgress).values({
        caseId,
        progressState,
        userId,
      });
    })
});
