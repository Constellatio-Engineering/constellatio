import { db } from "@/db/connection";
import { type CaseProgress, casesProgress } from "@/db/schema";
import { getCaseProgressSchema } from "@/schemas/caseProgress/getCaseProgress.schema";
import { getCasesProgressSchema } from "@/schemas/caseProgress/getCasesProgress.schema";
import { setCaseProgressStateSchema } from "@/schemas/caseProgress/setCaseProgressState.schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import { and, eq, inArray, type SQLWrapper } from "drizzle-orm";

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

      if(!caseProgress)
      {
        return {
          caseId,
          progressState: "not-started",
          userId,
        } satisfies CaseProgress;
      }

      return caseProgress;
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

      return db.query.casesProgress.findMany({
        where: and(...queryConditions),
      });
    }),
  resetProgress: protectedProcedure
    .mutation(() =>
    {
      // Set case progress to "not-started"
      // Reset all games progress

      console.log("resetProgress");
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
