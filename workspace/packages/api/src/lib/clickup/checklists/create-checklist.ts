import { env } from "@constellatio/env";
import axios from "axios";

import { clickupRequestConfig } from "../utils";

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

