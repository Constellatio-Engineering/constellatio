import { db } from "@/db/connection";
import { referralBalances, referrals, users } from "@/db/schema";
import { env } from "@/env.mjs";
import { stripe } from "@/lib/stripe";
import { InternalServerError } from "@/utils/serverError";

import { and, count, eq, sql } from "drizzle-orm";
import { type NextApiHandler } from "next";
import getRawBody from "raw-body";
import type Stripe from "stripe";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ReferralBonusAmount = 10;
const ReferralExtraBonusAmount = 50;
const ReferralExtraBonusReferralsNeeded = 5;

async function addBalanceToUser(userId: string, amaount: number): Promise<void>
{
  await db.update(referralBalances).set({
    totalRefferalBonus: sql`"TotalRefferalBonus" + ${amaount}`
  }
  ).where(eq(referralBalances.userId, userId));
}

async function handleReferral(dbUserId: string, event: Stripe.Event): Promise<void>
{
  const referral = await db
    .query.referrals.findFirst({
      where: and(eq(referrals.referredUserId, dbUserId), eq(referrals.paid, false)),
    });
  if(!referral) 
  {
    return; 
  }
  await db
    .update(referrals)
    .set({
      paid: true,
    })
    .where(eq(referrals.index, referral.index));
  
  const referringUser = await db
    .query.users.findFirst({
      columns: { id: true },
      where: eq(users.id, referral.referringUserId),
    });
  if(!referringUser) 
  {
    console.error("referring user not found or there was no user (case fleyer)");
    return;
  }

  await addBalanceToUser(referringUser.id, ReferralBonusAmount);

  const referralCount = await db
    .select({ count: count() })
    .from(referrals)
    .where(and(eq(referrals.referringUserId, referringUser.id), eq(referrals.paid, true)));
  if(referralCount[0]!.count === ReferralExtraBonusReferralsNeeded) 
  {
    await addBalanceToUser(referringUser.id, ReferralExtraBonusAmount);
  }
}

const handler: NextApiHandler = async (req, res) =>
{
  const signature = req.headers["stripe-signature"];
  const signingSecret = env.STRIPE_SIGNING_SECRET;
  let event: Stripe.Event;
  try 
  {
    if(!signature)
    {
      throw new InternalServerError(new Error("Missing stripe signature header"));
    }

    const rawBody = await getRawBody(req, { limit: "1mb" });
    event = stripe.webhooks.constructEvent(rawBody, signature, signingSecret);
  }
  catch (error) 
  {
    console.error(`webhook signature verification failed. ${error}`);
    return res.status(400).send("Invalid");
  }

  if(!event.type.startsWith("invoice"))
  {
    return res.status(400).json({ message: "This endpoint only handles 'invoice' events." });
  }

  // we can now safely assume that event.data.object is a subscription object
  const subscriptionData = event.data.object as Stripe.Subscription;
  const stripeCustomerId = subscriptionData.customer;

  if(typeof stripeCustomerId !== "string")
  {
    console.error(`expected stripeCustomerId to be a string. got ${typeof stripeCustomerId} instead.`, stripeCustomerId);
    return res.status(400).send("Invalid");
  }

  const subscriptionDetailsFromDB = await db.query.users.findFirst({
    columns: { id: true },
    where: eq(users.stripeCustomerId, stripeCustomerId) 
  });

  if(subscriptionDetailsFromDB == null)
  {
    if(env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT === "staging")
    {
      console.info(`customer '${stripeCustomerId}' not found in db, but this is likely because the event was triggered in development`);
      return res.status(200).send("customer not found in db, but this is likely because the event was triggered in development");
    }

    console.error(`no user found with stripeCustomerId ${stripeCustomerId}`);
    return res.status(400).send("customer not found in db");
  }

  if(event.type === "invoice.paid") 
  {
    if(event.data.object.amount_paid === 0) 
    {
      // If amaount is 0 it is the test subscription and we can skip 
      return res.send({ success: true });
    }
    await handleReferral(subscriptionDetailsFromDB.id, event);
  }

  return res.send({ success: true });
};

export default handler;
