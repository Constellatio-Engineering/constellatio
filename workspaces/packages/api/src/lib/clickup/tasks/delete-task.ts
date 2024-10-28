import { env } from "@constellatio/env";
import { clickupRequestConfig } from "~/lib/clickup/utils";

import axios from "axios";

export const deleteClickupTask = async (taskId: string) =>
{
  return axios.delete(`${env.CLICKUP_API_ENDPOINT}/task/${taskId}`, clickupRequestConfig);
};

