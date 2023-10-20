import { env } from "@/env.mjs";
import { stripe } from "@/lib/stripe";
import { InternalServerError } from "@/utils/serverError";

import { type NextApiHandler } from "next";
import getRawBody from "raw-body";
import type Stripe from "stripe";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = async (req, res) =>
{
  const signature = req.headers["stripe-signature"];
  const signingSecret = env.STRIPE_SIGNING_SECRET;

  let event: Stripe.Event | undefined;

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
    return res.status(400).end();
  }

  const updateSubscription = async (event: Stripe.Event) =>
  {

  };

  const deleteSubscription = async (event: Stripe.Event) => {};
  
  try 
  {
    switch (event.type)
    {
      case "customer.subscription.updated": 
        await updateSubscription(event);
        break;

      case "customer.subscription.deleted":
        await deleteSubscription(event);
        break;

      default:
        console.warn(`Unhandled event type ${event.type}`);
    }

    res.send({ success: true });
  }
  catch (error) 
  {
    console.error(`webhook handler failed. ${error}`);
    res.send({ success: false });
  }
};

export default handler;
