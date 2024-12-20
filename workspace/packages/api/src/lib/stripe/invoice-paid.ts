import { and, count, eq, sql } from "@constellatio/db";
import { db } from "@constellatio/db/client";
import { referralBalances, referrals, users } from "@constellatio/db/schema";
import { env } from "@constellatio/env";
import type Stripe from "stripe";

import { getUserIdFromStripeEventData } from "./utils";
import { createClickupTask } from "../clickup/tasks/create-task";
import { clickupUserIds, getClickupCrmUserByUserId } from "../clickup/utils";

const ReferralBonusAmount = 10;
const ReferralExtraBonusAmount = 50;
const ReferralExtraBonusReferralsNeeded = 5;

async function addBalanceToUser(userId: string, amount: number): Promise<void>
{
  await db
    .update(referralBalances)
    .set({ totalRefferalBonus: sql`"TotalRefferalBonus" + ${amount}` })
    .where(eq(referralBalances.userId, userId));
}

async function handleReferral(dbUserId: string): Promise<void>
{
  const referral = await db.query.referrals.findFirst({
    where: and(eq(referrals.referredUserId, dbUserId), eq(referrals.paid, false)),
  });

  if(!referral)
  {
    return;
  }
  
  await db
    .update(referrals)
    .set({ paid: true })
    .where(eq(referrals.index, referral.index));

  const referringUser = await db.query.users.findFirst({
    columns: { email: true, id: true },
    where: eq(users.id, referral.referringUserId),
  });

  if(!referringUser)
  {
    console.error("referring user not found or there was no user");
    return;
  }

  await addBalanceToUser(referringUser.id, ReferralBonusAmount);

  const [crmReferringUserTask] = await getClickupCrmUserByUserId(referringUser.id);

  await createClickupTask(env.CLICKUP_REFERRAL_PAYOUT_LIST_ID, {
    assignees: [clickupUserIds.sven],
    description: `Der Nutzer mit der E-Mail-Adresse: ${referringUser.email} (${referringUser.id}) hat einen Referral-Bonus von ${ReferralBonusAmount}€ erhalten.`,
    links_to: crmReferringUserTask?.id ?? null,
    name: `Referral Bonus für ${referringUser.email} (${referringUser.id})`,
  });

  const referralCount = await db
    .select({ count: count() })
    .from(referrals)
    .where(and(eq(referrals.referringUserId, referringUser.id), eq(referrals.paid, true)));

  if(referralCount[0]!.count === ReferralExtraBonusReferralsNeeded)
  {
    await addBalanceToUser(referringUser.id, ReferralExtraBonusAmount);
    await createClickupTask(env.CLICKUP_REFERRAL_PAYOUT_LIST_ID, {
      assignees: [clickupUserIds.sven],
      description: `Der Nutzer mit der E-Mail-Adresse: ${referringUser.email} (${referringUser.id}) hat einen Referral-Bonus von ${ReferralExtraBonusAmount}€ erhalten.`,
      links_to: crmReferringUserTask?.id ?? null,
      name: `Referral Extra Bonus für ${referringUser.email} (${referringUser.id})`,
    });
  }
}

// eslint-disable-next-line import/no-unused-modules
export const handleInvoicePaid = async (invoiceEvent: Stripe.Invoice) =>
{
  const userData = await getUserIdFromStripeEventData(invoiceEvent);

  if(userData == null)
  {
    return;
  }

  if(invoiceEvent.amount_paid === 0)
  {
    return;
  }

  await handleReferral(userData.userId);
};
