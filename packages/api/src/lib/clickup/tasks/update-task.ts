import { env } from "@acme/env";
import { type ClickupTask } from "~/lib/clickup/types";
import { clickupRequestConfig } from "~/lib/clickup/utils";

import axios from "axios";

// Note: To update Custom Fields on a task, you must use the Set Custom Field endpoint.

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const updateClickupTask = async (taskId: string, update: Partial<Omit<ClickupTask, "custom_fields">>) =>
{
  return axios.put(`${env.CLICKUP_API_ENDPOINT}/task/${taskId}`, update, clickupRequestConfig);
};

