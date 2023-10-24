import { db } from "@/db/connection";
import { users } from "@/db/schema";
import { setOnboardingResultSchema } from "@/schemas/users/setOnboardingResult.schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { filterUserForClient } from "@/utils/filters";
import { NotFoundError } from "@/utils/serverError";

import { eq } from "drizzle-orm";

export const usersRouter = createTRPCRouter({
  getOnboardingResult: protectedProcedure
    .query(async ({ ctx: { userId } }) =>
    {
      const onboardingResult = await db
        .select({ onboardingResult: users.onboardingResult })
        .from(users)
        .where(eq(users.id, userId));

      return onboardingResult[0]?.onboardingResult ?? null;
    }),
  getUserDetails: protectedProcedure
    .query(async ({ ctx: { userId } }) =>
    {
      const user = await db.query.users.findFirst({ where: eq(users.id, userId) });

      if(!user)
      {
        throw new NotFoundError();
      }

      return filterUserForClient(user);
    }),
  setOnboardingResult: protectedProcedure
    .input(setOnboardingResultSchema)
    .mutation(async ({ ctx: { userId }, input: { result } }) =>
    {
      await db.update(users).set({ onboardingResult: result }).where(eq(users.id, userId));
    })
});
