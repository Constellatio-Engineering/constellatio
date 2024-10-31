import { env } from "@constellatio/env";
import axios from "axios";

import { type ClickupTaskCreate } from "../types";
import { clickupRequestConfig } from "../utils";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createClickupTask = async (listId: string, body: ClickupTaskCreate) =>
{
  return axios.post(`${env.CLICKUP_API_ENDPOINT}/list/${listId}/task`, body, clickupRequestConfig);
};

