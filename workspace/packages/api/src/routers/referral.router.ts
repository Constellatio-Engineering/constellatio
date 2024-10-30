import { and, count, eq } from "@constellatio/db";
import { db } from "@constellatio/db/client";
import { referralBalances, referralCodes, referrals, users } from "@constellatio/db/schema";
import { getReferralCountSchema } from "@constellatio/schemas";

import crypto from "crypto";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

async function createUniqueCode(): Promise<string>
{
  // 4 bytes = 8 chars
  const code = crypto.randomBytes(4).toString("hex");
  const codeExists = await db.query.referralCodes.findFirst({
    where: eq(referralCodes.code, code),
  });
  if(codeExists) 
  {
    return createUniqueCode();
  }
  return code;
}

export const referralRouter = createTRPCRouter({
  createReferralCode: protectedProcedure.mutation(async ({ ctx: { userId } }) =>
  {
    await db.insert(referralBalances).values({
      userId,
    });
    const refCode = await createUniqueCode();
    const code = await db.insert(referralCodes).values({
      code: refCode,
      userId,
    }).returning(); 
    return code[0]!.code;
    
  }),

  getOwnReferralCode: protectedProcedure.query(async ({ ctx: { userId } }) =>
  {
    const code = await db.query.referralCodes.findFirst({
      where: eq(referralCodes.userId, userId),
    });

    return code ? code.code : null;
  }),

  getOwnReferrer: protectedProcedure.query(async ({ ctx: { userId } }) =>
  {
    const referral = await db.query.referrals.findFirst({
      where: eq(referrals.referredUserId, userId),
    });
    if(!referral)
    {
      return null;
    }
    const referringUser = await db
      .select({ displayName: users.displayName })
      .from(users)
      .where(eq(users.id, referral.referringUserId));
    return referringUser[0];
  }),
  
  getReferralCounts: protectedProcedure
    .query(async ({ ctx: { userId } }) =>
    {
      const amaountQueryPaid = db
        .select({ count: count() })
        .from(referrals)
        .where(and(eq(referrals.referringUserId, userId), eq(referrals.paid, true)));  
      
      const amountQueryTotal = db
        .select({ count: count() })
        .from(referrals)
        .where(eq(referrals.referringUserId, userId));
    
      const [paidCountResult, totalCountResult] = await Promise.all([amaountQueryPaid, amountQueryTotal]);
      return {
        paidCount: paidCountResult[0]!.count,
        totalCount: totalCountResult[0]!.count,
        unpaidCount: totalCountResult[0]!.count - paidCountResult[0]!.count,
      };
    }),

  getReffererByCode: publicProcedure
    .input(getReferralCountSchema)
    .query(async ({ input: { code } }) =>
    {
      const referringUser = await db
        .select({ displayName: users.displayName })
        .from(users)
        .innerJoin(referralCodes, eq(referralCodes.userId, users.id))
        .where(eq(referralCodes.code, code));
      
      if(!referringUser[0]) 
      {
        return null;
      }

      return referringUser[0];
    }),
});
