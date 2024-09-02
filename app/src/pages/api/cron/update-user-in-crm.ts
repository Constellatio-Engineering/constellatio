/* eslint-disable max-lines */
import { db } from "@/db/connection";
import { updateUserInCrmQueue } from "@/db/schema";
import { env } from "@/env.mjs";
import { syncUserToCrm } from "@/lib/clickup/utils";

import { AxiosError } from "axios";
import { eq } from "drizzle-orm";
import { type NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res): Promise<void> =>
{
  if(req.headers.authorization !== `Bearer ${env.CRON_SECRET}`)
  {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if(!env.SYNC_USERS_TO_CRM)
  {
    return res.status(200).json({ message: "Syncing users to CRM is disabled in this environment" });
  }

  const usersToUpdate = await db.query.updateUserInCrmQueue.findMany();

  console.log(`CRM Update Cronjob - Found ${usersToUpdate.length} users to update in CRM`);

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

      console.log(`Successfully updated user ${record.userId} in CRM`);

      await db.delete(updateUserInCrmQueue).where(eq(updateUserInCrmQueue.userId, record.userId));
    }
    catch (error) 
    {
      console.error(`Failed to update user ${record.userId}:`);

      // TODO: Implement a failed trys counter for every failed user update and notify the admin if the counter reaches a certain number

      if(error instanceof AxiosError)
      {
        if(error.response?.status === 429)
        {
          console.info("Rate limit reached.");
          break;
        }

        console.log("AxiosError", error.response?.data);
      }
      else
      {
        console.log("Error is not AxiosError", error);
      }
    }
  }

  return res.status(200).json({ message: "Success" });
};

export default handler;
