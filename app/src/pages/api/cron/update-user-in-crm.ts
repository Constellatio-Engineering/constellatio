/* eslint-disable max-lines */
import { db } from "@/db/connection";
import { updateUserInCrmQueue } from "@/db/schema";
import { env } from "@/env.mjs";
import { syncUserToCrm } from "@/lib/clickup/utils";

import { eq } from "drizzle-orm";
import { type NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res): Promise<void> =>
{
  if(req.headers.authorization !== `Bearer ${env.CRON_SECRET}`)
  {
    return res.status(401).json({ message: "Unauthorized" });
  }

  console.log("----- [Cronjob] Update Search Indexes -----");

  const usersToUpdate = await db.query.updateUserInCrmQueue.findMany();

  console.log(`Found ${usersToUpdate.length} users to update in CRM:`, usersToUpdate.map((user) => user.userId));

  for(const record of usersToUpdate)
  {
    try 
    {
      await syncUserToCrm({
        eventType: "userUpdated",
        supabase: {
          isServerClientInitialized: false,
          req,
          res
        },
        userId: record.userId
      });

      await db.delete(updateUserInCrmQueue).where(eq(updateUserInCrmQueue.userId, record.userId));
    }
    catch (error) 
    {
      console.error(`Failed to update user ${record.userId}:`, error);
    }
  }

  return res.status(200).json({ message: "Success" });
};

export default handler;
