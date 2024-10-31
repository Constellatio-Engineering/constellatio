import { env } from "@constellatio/env";
import axios from "axios";

import { type ClickupTask } from "../types";
import { clickupRequestConfig } from "../utils";

// Note: To update Custom Fields on a task, you must use the Set Custom Field endpoint.

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const updateClickupTask = async (taskId: string, update: Partial<Omit<ClickupTask, "custom_fields">>) =>
{
  return axios.put(`${env.CLICKUP_API_ENDPOINT}/task/${taskId}`, update, clickupRequestConfig);
};

