/* eslint-disable max-lines */
import { idValidation } from "@/schemas/common.validation";

import { type NextApiHandler } from "next";
import { z, ZodError } from "zod";

const formbricksWebhookSchema = z.discriminatedUnion("event", [
  z.object({
    data: z.object({
      createdAt: z.string(),
      data: z.record(z.string(), z.string()),
      meta: z.object({
        url: z.string(),
        userAgent: z.any(),
      }),
      person: z.object({
        userId: idValidation,
      })
    }),
    event: z.enum(["responseUpdated", "responseCreated", "responseFinished"]),
  }),
  z.object({
    event: z.literal("testEndpoint")
  })
]);

type FormbricksWebhook = z.infer<typeof formbricksWebhookSchema>;

const handler: NextApiHandler = async (req, res): Promise<void> =>
{
  console.log(`----- ${(new Date()).toLocaleTimeString("de")} Formbricks Webhook received for received feedback -----`);

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

  console.log("Formbricks Webhook received:", JSON.stringify(webhookRequestBody, null, 2));

  return res.status(200).json({ message: "Success" });
};

export default handler;
