import { idValidation } from "@/common/common.validation";
import { z } from "zod";

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