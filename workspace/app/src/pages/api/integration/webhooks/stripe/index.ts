import { env } from "@/env.mjs";

import { addUserToCrmUpdateQueue } from "@constellatio/api/lib/clickup/utils";
import { handleInvoicePaid } from "@constellatio/api/lib/stripe/invoice-paid";
import { stripe } from "@constellatio/api/lib/stripe/stripe";
import { handleSubscriptionEvent } from "@constellatio/api/lib/stripe/subscription";
import { InternalServerError } from "@constellatio/api/utils/serverError";
import { eq } from "@constellatio/db";
import { db } from "@constellatio/db/client";
import { users } from "@constellatio/db/schema";
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
    await handleInvoicePaid(event.data.object);
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
