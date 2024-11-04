import { env } from "@constellatio/env";
import axios from "axios";

import { clickupRequestConfig } from "../utils";

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
