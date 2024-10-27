import { env } from "@acme/env";
import { type ClickupTaskCreate } from "~/lib/clickup/types";
import { clickupRequestConfig } from "~/lib/clickup/utils";

import axios from "axios";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createClickupTask = async (listId: string, body: ClickupTaskCreate) =>
{
  return axios.post(`${env.CLICKUP_API_ENDPOINT}/list/${listId}/task`, body, clickupRequestConfig);
};

