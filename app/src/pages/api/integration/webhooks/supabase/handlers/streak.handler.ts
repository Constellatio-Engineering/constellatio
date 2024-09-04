import { createStreakActivity } from "@/server/api/services/streak.services";

import { type SupabaseWebhookPayload } from "..";

const streakHandler = async (payload: SupabaseWebhookPayload): Promise<void> =>
{
  console.log("streak handler", payload);
  await createStreakActivity("solvedCase", "dummyId");
};

export default streakHandler;
