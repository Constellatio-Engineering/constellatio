import { env } from "@/env.mjs";
import { type ClickupTask } from "@/lib/clickup/types";
import { clickupRequestConfig } from "@/lib/clickup/utils";

import axios from "axios";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createClickupTask = async (body: ClickupTask) =>
{
  return axios.post(`${env.CLICKUP_API_ENDPOINT}/list/${env.CLICKUP_CRM_LIST_ID}/task`, body, clickupRequestConfig);
};

