import { env } from "@/env.mjs";
import { clickupRequestConfig } from "@/lib/clickup/utils";

import axios from "axios";

export const deleteClickupTask = async (taskId: string) =>
{
  return axios.delete(`${env.CLICKUP_API_ENDPOINT}/task/${taskId}`, clickupRequestConfig);
};

