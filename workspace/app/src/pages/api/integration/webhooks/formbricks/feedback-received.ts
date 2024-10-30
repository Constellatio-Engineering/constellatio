/* eslint-disable max-lines */
import { env } from "@/env.mjs";

import { eq } from "@constellatio/db";
import { db } from "@constellatio/db/client";
import { users } from "@constellatio/db/schema";
import { type NextApiHandler } from "next";
import { z, ZodError } from "zod";

import { createClickupTask } from "@/lib/clickup/tasks/create-task";
import { getClickupCrmUserByUserId, getUserFeedbackTaskCrmData } from "@/lib/clickup/utils";
import { idValidation } from "@/schemas/common.validation";

const handler: NextApiHandler = async (req, res): Promise<void> =>
{
  console.log(`----- ${(new Date()).toLocaleTimeString("de")} Formbricks Webhook received for received feedback -----`);

  if(env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT !== "production")
  {
    console.info("Automatic creation of clickup tasks is only enabled in production");
    return res.status(200).json({ message: "Automatic creation of clickup tasks is only enabled in production" });
  }
  
  let webhookRequestBody: FormbricksWebhook;

  try
  {
    webhookRequestBody = await formbricksWebhookSchema.parseAsync(req.body);
  }
  catch (e: unknown)
  {
    if(e instanceof ZodError)
    {
      console.error("Formbricks Webhook did not match expected schema.", e.issues);
      return res.status(400).json({ issues: e.issues, message: "Invalid request body" });
    }
    else
    {
      console.error("Something went wrong while parsing the Formbricks Webhook request body.", e);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }

  if(webhookRequestBody.event === "testEndpoint")
  {
    console.log("Formbricks Webhook test endpoint reached.");
    return res.status(200).json({ message: "Success" });
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, webhookRequestBody.data.person.userId)
  });

  const [userCrmTasks] = await getClickupCrmUserByUserId(user?.id);
  const clickupTaskData = getUserFeedbackTaskCrmData(webhookRequestBody.data, user, userCrmTasks?.id);
  await createClickupTask(env.CLICKUP_FEEDBACK_LIST_ID, clickupTaskData);

  return res.status(200).json({ message: "Success" });
};

export default handler;
