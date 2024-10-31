import { env } from "@constellatio/env";
import axios from "axios";

import { clickupRequestConfig } from "../utils";

export const deleteClickupTask = async (taskId: string) =>
{
  return axios.delete(`${env.CLICKUP_API_ENDPOINT}/task/${taskId}`, clickupRequestConfig);
};

