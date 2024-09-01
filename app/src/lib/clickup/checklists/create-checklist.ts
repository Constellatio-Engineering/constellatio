import { env } from "@/env.mjs";
import { clickupRequestConfig } from "@/lib/clickup/utils";

import axios from "axios";

export const createClickupChecklist = async ({
  checklistName,
  taskId
}: {
  checklistName: string;
  taskId: string;
}) => // eslint-disable-line @typescript-eslint/explicit-function-return-type
{
  return axios.post(
    `${env.CLICKUP_API_ENDPOINT}/task/${taskId}/checklist`,
    { name: checklistName },
    clickupRequestConfig
  );
};

