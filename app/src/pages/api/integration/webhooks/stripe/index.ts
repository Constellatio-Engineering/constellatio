import { db } from "@/db/connection";
import { users } from "@/db/schema";
import { env } from "@/env.mjs";
import { addUserToCrmUpdateQueue } from "@/lib/clickup/utils";
import { stripe } from "@/lib/stripe/stripe";
import { handleSubscriptionEvent } from "@/lib/stripe/subscription";
import { InternalServerError } from "@/utils/serverError";

import { eq } from "drizzle-orm";
import type { NextApiHandler } from "next";
import getRawBody from "raw-body";
import type Stripe from "stripe";

export const config = {
  api: {
    bodyParser: false,
  },
};

const crmRelevantEvents: Array<Stripe.Event["type"]> = [
  "customer.subscription.trial_will_end",
  "customer.subscription.resumed",
  "customer.subscription.created",
  "customer.subscription.paused",
  "customer.subscription.updated",
  "customer.subscription.deleted",
  "invoice.paid",
  "customer.updated",
  "payment_method.updated",
  "payment_method.attached",
  "payment_method.detached",
];

const handler: NextApiHandler = async (req, res) =>
{
  const signature = req.headers["stripe-signature"];
  const signingSecret = env.STRIPE_SIGNING_SECRET;

  if(!signature)
  {
    throw new InternalServerError(new Error("Missing stripe signature header"));
  }

  const rawBody = await getRawBody(req, { limit: "1mb" });
  const event = stripe.webhooks.constructEvent(rawBody, signature, signingSecret);

  if(event.type.startsWith("customer.subscription"))
  {
    await handleSubscriptionEvent(event.data.object as Stripe.Subscription);
  }
  else if(event.type === "invoice.paid")
  {
    // TODO: This is currently disabled
    // await handleInvoicePaid(event.data.object);
  }

  if(crmRelevantEvents.includes(event.type))
  {
    let customerId: string | undefined;

    if("customer" in event.data.object)
    {
      const { customer } = event.data.object;
      customerId = typeof customer === "string" ? customer : customer?.id;
    }
    else if(event.data.object.object === "customer")
    {
      customerId = event.data.object.id;
    }

    if(customerId == null)
    {
      throw new Error("no customer id found in stripe event object");
    }

    const user = await db.query.users.findFirst({
      where: eq(users.stripeCustomerId, customerId)
    });

    await addUserToCrmUpdateQueue(user?.id);
  }

  return res.status(200).send("Success");
};

export default handler;
