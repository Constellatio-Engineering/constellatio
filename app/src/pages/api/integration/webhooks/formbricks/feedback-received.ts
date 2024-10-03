/* eslint-disable max-lines */
import { db } from "@/db/connection";
import { users } from "@/db/schema";
import { env } from "@/env.mjs";
import { createClickupTask } from "@/lib/clickup/tasks/create-task";
import { getClickupCrmUserByUserId, getUserFeedbackTaskCrmData } from "@/lib/clickup/utils";
import { idValidation } from "@/schemas/common.validation";

import { eq } from "drizzle-orm";
import { type NextApiHandler } from "next";
import { z, ZodError } from "zod";

const formbricksTestWebhookSchema = z.object({
  event: z.literal("testEndpoint")
});

const formbricksFeedbackWebhookSchema = z.object({
  data: z.object({
    createdAt: z.string(),
    data: z.record(z.string(), z.string()),
    meta: z.object({
      url: z.string(),
      userAgent: z.record(z.string(), z.any()),
    }),
    person: z.object({
      userId: idValidation,
    })
  }),
  event: z.enum(["responseUpdated", "responseCreated", "responseFinished"]),
});

const formbricksWebhookSchema = z.discriminatedUnion("event", [
  formbricksTestWebhookSchema,
  formbricksFeedbackWebhookSchema
]);

type FormbricksWebhook = z.infer<typeof formbricksWebhookSchema>;
export type FormbricksFeedbackWebhook = z.infer<typeof formbricksFeedbackWebhookSchema>;

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
