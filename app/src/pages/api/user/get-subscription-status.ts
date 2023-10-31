import { db } from "@/db/connection";
import { users } from "@/db/schema";
import { env } from "@/env.mjs";

import { eq } from "drizzle-orm";
import { type NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) =>
{
  if(req.query.secret !== env.GET_SUBSCRIPTION_STATUS_SECRET)
  {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if(req.method !== "GET")
  {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userId } = req.query;

  if(!userId || typeof userId !== "string")
  {
    return res.status(400).json({ error: "userId is required" });
  }

  const getSubscriptionStatusResult = await db.query.users.findFirst({
    columns: {
      subscriptionStatus: true
    },
    where: eq(users.id, userId)
  });

  if(!getSubscriptionStatusResult)
  {
    return res.status(404).json({ error: "User not found" });
  }

  return res.json(getSubscriptionStatusResult);
};

export default handler;
