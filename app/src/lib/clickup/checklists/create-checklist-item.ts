import { env } from "@/env.mjs";
import { clickupRequestConfig } from "@/lib/clickup/utils";

import axios from "axios";

export const createClickupChecklistItem = async ({
  assigneeId,
  checklistId,
  itemName,
}: {
  assigneeId?: number;
  checklistId: string;
  itemName: string;
}) => // eslint-disable-line @typescript-eslint/explicit-function-return-type
{
  return axios.post(
    `${env.CLICKUP_API_ENDPOINT}/checklist/${checklistId}/checklist_item`,
    {
      assignee: assigneeId,
      name: itemName
    },
    clickupRequestConfig
  );
};
