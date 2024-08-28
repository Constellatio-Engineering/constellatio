import { env } from "@/env.mjs";
import { clickupRequestConfig } from "@/lib/clickup/utils";

import axios from "axios";

export const createClickupChecklistItem = async ({
  checklistId,
  itemName,
  assigneeId,
}: {
  checklistId: string;
  itemName: string
  assigneeId?: number;
}) => // eslint-disable-line @typescript-eslint/explicit-function-return-type
{
  return axios.post(
    `${env.CLICKUP_API_ENDPOINT}/checklist/${checklistId}/checklist_item`,
    {
      name: itemName,
      assignee: assigneeId
    },
    clickupRequestConfig
  );
};

